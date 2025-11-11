import supabase from "./supabase";

export async function sendInvoiceEmail({
  recipient,
  subject,
  htmlContent,
  replyTo,
}: // attachment,
{
  recipient: string;
  subject: string;
  htmlContent: string;
  replyTo: string;
  // attachment?: { content: string; name: string };
}) {
  // 1. Get JWT access token for current user/session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  const resp = await fetch(
    "https://itktbkqrupkkslfvlkht.supabase.co/functions/v1/send-invoice-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({
        recipient,
        subject,
        htmlContent,
        replyTo,
        // ...(attachment ? { attachment } : {})
      }),
    }
  );

  if (!resp.ok) {
    const error = await resp.text();
    throw new Error(error);
  }
  return resp.json();
}
