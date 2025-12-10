import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY")!; // <--- Uses the key from your screenshot

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- HELPER: SEND EMAIL VIA BREVO ---
async function sendReceiptEmail(invoice: any, amountPaid: number) {
  const companyName = invoice.companyInfo?.companyName || "PayPilot Merchant";

  // Format currency to Naira
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
  }).format(amountPaid);

  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
      <h2 style="color: #16a34a; text-align: center;">Payment Received! 🎉</h2>
      <p>Hello <strong>${invoice.client_name}</strong>,</p>
      <p>This is a confirmation that we have received your payment of <strong>${formattedAmount}</strong> for Invoice <strong>#${
    invoice.invoice_id
  }</strong>.</p>
      
      <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Paid to:</strong> ${companyName}</p>
        <p style="margin: 5px 0;"><strong>Amount:</strong> ${formattedAmount}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>

      <p style="text-align: center; color: #6b7280; font-size: 12px;">
        Powered by PayPilot
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: companyName, email: "chidimathayas@gmail.com" },
        to: [{ email: invoice.client_email, name: invoice.client_name }],
        subject: `Receipt for Invoice #${invoice.invoice_id}`,
        htmlContent: emailHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Brevo Error:", err);
    } else {
      console.log("Receipt Email Sent Successfully!");
    }
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

// --- MAIN WEBHOOK HANDLER ---
serve(async (req) => {
  if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405 });

  const rawBody = await req.text();
  if (!rawBody) return new Response("Empty body", { status: 400 });

  const payload = JSON.parse(rawBody);

  // 3. Handle Charge Success
  if (payload.event === "charge.success") {
    const data = payload.data;
    const invoiceId = data.metadata?.invoice_id;
    const amountPaid = data.amount / 100;

    console.log(`Processing Payment for Invoice: ${invoiceId}`);

    if (!invoiceId) return new Response("Missing invoice_id", { status: 400 });

    // 1. Update Database
    const { data: updatedInvoice, error } = await supabase
      .from("invoices")
      .update({
        status: "Paid",
        amount_paid: amountPaid,
        payment_date: new Date().toISOString(),
      })
      .eq("id", invoiceId)
      .select("*, companyInfo(companyName)") // Fetch company name for email
      .single();

    if (error) {
      console.error("DB Error:", error);
      return new Response("DB Error", { status: 500 });
    }

    // 2. Send Receipt Email (Fire and Forget)
    if (updatedInvoice) {
      // We call this without 'await' so Paystack gets a 200 OK immediately
      sendReceiptEmail(updatedInvoice, amountPaid);
    }

    return new Response("Invoice Paid & Receipt Sent", { status: 200 });
  }

  return new Response("Event ignored", { status: 200 });
});
