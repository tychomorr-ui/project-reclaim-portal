type SubmissionNotification = {
  type: "contact" | "partnership";
  name: string;
  email: string;
  organization?: string | null;
  phone?: string | null;
  focus?: string | null;
  message: string;
};

const RESEND_EMAILS_URL = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendOwnerSubmissionEmail(
  submission: SubmissionNotification,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.OWNER_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    console.warn("[Email] Owner email notification is not configured.");
    return false;
  }

  const kind = submission.type === "partnership" ? "Partnership inquiry" : "Community contact";
  const details = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Organization", submission.organization],
    ["Phone", submission.phone],
    ["Interest", submission.focus],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  const text = `${kind}\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${submission.message}`;
  const html = `<main style="font-family:Arial,sans-serif;color:#182017;line-height:1.55"><h1 style="font-size:20px">${escapeHtml(kind)}</h1><p>A new submission has arrived through Project Reclaim.</p><dl>${details.map(([label, value]) => `<dt style="font-weight:700;margin-top:12px">${escapeHtml(label)}</dt><dd style="margin:2px 0 0">${escapeHtml(value)}</dd>`).join("")}</dl><h2 style="font-size:16px;margin-top:20px">Message</h2><p style="white-space:pre-wrap">${escapeHtml(submission.message)}</p></main>`;

  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Project Reclaim: ${kind.toLowerCase()} from ${submission.name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.warn(`[Email] Resend returned ${response.status}.`);
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Email] Owner email notification failed:", error);
    return false;
  }
}
