import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "https://deno.land/std@0.168.0/node/crypto.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function verifyPaystackSignature(
  body: string,
  signature: string | null
): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY);
  const expected = hmac.update(body).digest("hex");
  return expected === signature;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await req.text(); // only this, no req.json()
  const signature = req.headers.get("x-paystack-signature");

  if (!verifyPaystackSignature(rawBody, signature)) {
    console.error("Invalid Paystack signature");
    return new Response("Invalid signature", { status: 400 });
  }

  const payload = JSON.parse(rawBody) as {
    event: string;
    data: {
      reference: string;
      status: string;
      amount: number;
      metadata?: { invoice_id?: string };
    };
  };

  console.log("PAYSTACK WEBHOOK PAYLOAD", payload);

  if (payload.event !== "charge.success") {
    return new Response("Event ignored", { status: 200 });
  }

  const invoiceId = payload.data.metadata?.invoice_id;
  if (!invoiceId) {
    console.error("Missing invoice_id in metadata", payload);
    return new Response("Missing invoice_id", { status: 400 });
  }

  const amountPaid = payload.data.amount / 100;

  const { error } = await supabase
    .from("invoices")
    .update({
      status: "Paid",
      amount_paid: amountPaid,
      payment_date: new Date().toISOString(),
      paystack_reference: payload.data.reference,
    })
    .eq("id", invoiceId); // or .eq("invoice_id", invoiceId) depending on your schema

  if (error) {
    console.error("Failed to update invoice:", error);
    return new Response("DB error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
});
