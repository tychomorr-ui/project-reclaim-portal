#!/usr/bin/env bash
set -Eeuo pipefail

# Project Reclaim Oregon Lightsail launcher.
# Run from a trusted workstation or sandbox with the release archive and SSH key.
# Secrets are accepted only through --env-file and are never printed.

DOMAIN="reclaim.nexinus.net"
HOST=""
USER_NAME="ubuntu"
KEY=""
RELEASE=""
ENV_FILE=""
RELEASE_ID="e5c2eb96"
NODE_VERSION="22.13.0"

usage() {
  cat <<'USAGE'
Usage:
  project-reclaim-launch.sh --host <ip-or-hostname> --key <ssh-key> --release <release.tgz> [options]

Options:
  --domain <name>       Public domain (default: reclaim.nexinus.net)
  --user <name>         SSH user (default: ubuntu)
  --env-file <file>     Production .env file; required before starting the app
  --release-id <id>     Version label (default: e5c2eb96)
  --node-version <ver>  Node.js version (default: 22.13.0)
  --help                Show this message

The script stops before PM2 if --env-file is omitted. It does not request DNS,
issue certificates, or enable firewall rules until SSH is explicitly preserved.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2 ;;
    --host) HOST="$2"; shift 2 ;;
    --user) USER_NAME="$2"; shift 2 ;;
    --key) KEY="$2"; shift 2 ;;
    --release) RELEASE="$2"; shift 2 ;;
    --env-file) ENV_FILE="$2"; shift 2 ;;
    --release-id) RELEASE_ID="$2"; shift 2 ;;
    --node-version) NODE_VERSION="$2"; shift 2 ;;
    --help) usage; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
  esac
done

[[ -n "$HOST" && -n "$KEY" && -n "$RELEASE" ]] || { usage >&2; exit 2; }
[[ -f "$KEY" ]] || { echo "SSH key not found: $KEY" >&2; exit 2; }
[[ -f "$RELEASE" ]] || { echo "Release archive not found: $RELEASE" >&2; exit 2; }
chmod 600 "$KEY"

if [[ -n "$ENV_FILE" ]]; then
  [[ -f "$ENV_FILE" ]] || { echo "Environment file not found: $ENV_FILE" >&2; exit 2; }
  if [[ "$(stat -c '%a' "$ENV_FILE")" != "600" ]]; then
    echo "Environment file must be mode 600: $ENV_FILE" >&2
    exit 2
  fi
fi

SSH=(ssh -o BatchMode=yes -o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new -i "$KEY" "${USER_NAME}@${HOST}")
SCP=(scp -o BatchMode=yes -o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new -i "$KEY")
TMP_DIR="$(mktemp -d)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

REMOTE_SCRIPT="$TMP_DIR/project-reclaim-remote-bootstrap.sh"
cat > "$REMOTE_SCRIPT" <<'REMOTE'
#!/usr/bin/env bash
set -Eeuo pipefail
DOMAIN="$1"
RELEASE_ID="$2"
NODE_VERSION="$3"
RELEASE_ARCHIVE="$4"
ENV_PRESENT="$5"

sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl nginx

# Install Node from the official distribution without replacing the OS package manager.
cd /tmp
curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz"
sudo rm -rf "/opt/node-v${NODE_VERSION}-linux-x64"
sudo tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /opt
sudo ln -sfn "/opt/node-v${NODE_VERSION}-linux-x64" /opt/node-current
sudo ln -sfn /opt/node-current/bin/node /usr/local/bin/node
sudo ln -sfn /opt/node-current/bin/npm /usr/local/bin/npm
sudo ln -sfn /opt/node-current/bin/npx /usr/local/bin/npx
sudo ln -sfn /opt/node-current/bin/node /usr/bin/node
sudo ln -sfn /opt/node-current/bin/node /usr/bin/nodejs
sudo /usr/local/bin/npm install -g pnpm@10.4.1 pm2

sudo mkdir -p "/opt/project-reclaim/releases/${RELEASE_ID}"
sudo rm -rf "/opt/project-reclaim/releases/${RELEASE_ID}"
sudo mkdir -p "/opt/project-reclaim/releases/${RELEASE_ID}"
sudo tar -xzf "$RELEASE_ARCHIVE" -C "/opt/project-reclaim/releases/${RELEASE_ID}"
sudo chown -R ubuntu:ubuntu "/opt/project-reclaim/releases/${RELEASE_ID}"
cd "/opt/project-reclaim/releases/${RELEASE_ID}"
pnpm install --frozen-lockfile
ln -sfn "/opt/project-reclaim/releases/${RELEASE_ID}" /opt/project-reclaim/current

if [[ "$ENV_PRESENT" != "yes" ]]; then
  echo "RELEASE_READY_NO_ENV"
  echo "Add a mode-600 .env to /opt/project-reclaim/current, then rerun with --env-file."
  exit 0
fi

chmod 600 /opt/project-reclaim/current/.env

# Write Nginx only after the application release is present.
sudo tee /etc/nginx/sites-available/project-reclaim >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};
    client_max_body_size 50m;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 60s;
    }
}
NGINX
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sfn /etc/nginx/sites-available/project-reclaim /etc/nginx/sites-enabled/project-reclaim
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

# Safety order: preserve SSH first, then web ports, then enable UFW.
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status verbose

cd /opt/project-reclaim/current
pm2 delete project-reclaim-portal >/dev/null 2>&1 || true
pm2 start deployment/lightsail/ecosystem.config.cjs --cwd /opt/project-reclaim/current
pm2 save
PM2_BIN="$(readlink -f "$(command -v pm2)")"
sudo env PATH="/opt/node-current/bin:${PATH}" "$PM2_BIN" startup systemd -u ubuntu --hp /home/ubuntu >/tmp/project-reclaim-pm2-startup.log 2>&1 || true
sudo env PATH="/opt/node-current/bin:${PATH}" "$PM2_BIN" save
sleep 3
curl -fsS -I --max-time 10 http://127.0.0.1:3000/
pm2 status

echo "DEPLOYMENT_READY_HTTP_ONLY"
echo "DNS must resolve ${DOMAIN} to this instance before TLS can be requested."
REMOTE
chmod 700 "$REMOTE_SCRIPT"

"${SCP[@]}" "$RELEASE" "${USER_NAME}@${HOST}:/tmp/project-reclaim-release-${RELEASE_ID}.tgz"
"${SCP[@]}" "$REMOTE_SCRIPT" "${USER_NAME}@${HOST}:/tmp/project-reclaim-remote-bootstrap.sh"

if [[ -n "$ENV_FILE" ]]; then
  "${SCP[@]}" "$ENV_FILE" "${USER_NAME}@${HOST}:/tmp/project-reclaim.env"
  "${SSH[@]}" "umask 077; sudo mkdir -p /opt/project-reclaim/current; sudo install -o ubuntu -g ubuntu -m 600 /tmp/project-reclaim.env /opt/project-reclaim/current/.env; rm -f /tmp/project-reclaim.env"
  ENV_PRESENT=yes
else
  ENV_PRESENT=no
fi

"${SSH[@]}" "bash /tmp/project-reclaim-remote-bootstrap.sh '$DOMAIN' '$RELEASE_ID' '$NODE_VERSION' '/tmp/project-reclaim-release-${RELEASE_ID}.tgz' '$ENV_PRESENT'"

if [[ "$ENV_PRESENT" != "yes" ]]; then
  echo "Release installed but not started: supply --env-file and rerun." >&2
  exit 3
fi

echo "Project Reclaim deployment completed through HTTP readiness."
echo "Next gate: point ${DOMAIN} DNS A record to ${HOST}, then request TLS with certbot."
