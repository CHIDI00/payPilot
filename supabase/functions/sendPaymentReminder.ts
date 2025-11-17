// // supabase/functions/sendPaymentReminders/index.ts

// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js";
// const supabase = createClient(
//   Deno.env.get("SUPABASE_URL")!,
//   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
// );

// serve(async (_req) => {
//   // Get all invoices due in the next 3 days and still pending
//   const toDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
//   const { data: invoices, error } = await supabase
//     .from("invoices")
//     .select("*")
//     .eq("status", "Pending")
//     .lte("due_date", toDate);

//   if (error) return new Response("DB error", { status: 500 });

//   for (const invoice of invoices) {
//     await fetch("YOUR_BREVO_EMAIL_FUNCTION_URL", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         recipient: invoice.client_email,
//         subject: `Payment Reminder - Invoice #${invoice.invoice_id}`,
//         htmlContent: `
//           <p>Hello ${invoice.client_name || "Client"},</p>
//           <p>This is a friendly reminder that your invoice <b>#${invoice.invoice_id}</b> is due on <b>${invoice.due_date}</b> for <b>${invoice.amount || "an outstanding amount"}</b>.</p>
//           <p>Please pay soon or contact us if you have questions. Thank you!</p>
//         `,
//         replyTo: "support@paypilot.com",
//       }),
//     });
//     // OPTIONAL: Update your DB or add a log to record reminder sent
//   }

//   return new Response("Reminders sent", { status: 200 });
// });
