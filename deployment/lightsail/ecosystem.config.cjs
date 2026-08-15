module.exports = {
  apps: [
    {
      name: "project-reclaim-portal",
      script: "dist/index.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      time: true,
      autorestart: true,
      restart_delay: 3000,
      merge_logs: true,
    },
  ],
};
