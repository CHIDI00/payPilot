export async function sendInvoiceEmail({
  recipient,
  subject,
  htmlContent,
  replyTo,
}: {
  recipient: string;
  subject: string;
  htmlContent: string;
  replyTo: string;
}) {
  const resp = await fetch(
    "https://itktbkqrupkkslfvlkht.supabase.co/functions/v1/send-invoice-email",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient,
        subject,
        htmlContent,
        replyTo,
      }),
    }
  );

  if (!resp.ok) {
    const error = await resp.text();
    throw new Error(error);
  }
  return resp.json();
}
