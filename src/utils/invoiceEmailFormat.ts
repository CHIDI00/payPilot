interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export function invoiceEmailHtml({
  logo,
  companyLogo,
  client_name,
  invoice_id,
  invoice_id_uuid,
  total,
  formatCurrencyWithoutFormating,
  invoice_date,
  companyWebsite,
  companyName,
  items,
  status,
}: {
  logo?: string;
  companyLogo: string;
  client_name?: string;
  invoice_id: string | number;
  invoice_id_uuid: string;
  total: number;
  formatCurrency: (amount: number) => string;
  formatCurrencyWithoutFormating: (amount: number) => string;
  invoice_date: string | Date | null;
  companyWebsite?: string;
  companyName?: string;
  items: InvoiceItem[];
  status: string;
}) {
  const baseUrl = "paypilot-beta.vercel.app";
  const paymentLink = `${baseUrl}/pay/${invoice_id_uuid}`;

  return `
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#222;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#9277ff;border-radius:8px;padding:1.5rem 2rem;margin-bottom:2rem;">
      <tr>
        <td style="font-size:1.2rem;color:#fff;">Invoice by</td>
        <td style="text-align:right;">
          <span style="color:#fff;font-size:1.9rem;font-weight:bold;">PayPilot</span>
        </td>
      </tr>
    </table>

    <div style="background:#fff;padding:2rem;border:2px solid gray;border-radius:8px;">
      <div style="text-align:right;margin-bottom:10px;">
        <img src="${
          logo || companyLogo
        }" alt="Company Logo" style="height:50px;margin:0 auto 8px auto;">
      </div>
      <h2 style="font-size:1.1rem;margin-bottom:1px;">Hello ${
        client_name || "Customer"
      },</h2>
      <p style="font-size:0.9rem;"> ${
        status.toLowerCase() === "paid"
          ? "Your receipt"
          : "Please find your invoice below"
      } .</p>
      <table style="width:100%;margin:1.5rem 0;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;font-weight:bold;">Invoice ID:</td>
          <td style="padding:8px 0;">${invoice_id}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;">Due Date:</td>
          <td style="padding:8px 0;">${
            invoice_date
              ? new Date(invoice_date).toLocaleDateString("en-GB")
              : ""
          }</td>
        </tr>
      </table>
      <h3 style="margin:10px 0 4px 0;">Items</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th align="left" style="padding:6px 2px;border-bottom:1px solid #eee;">Item</th>
            <th align="center" style="padding:6px 2px;border-bottom:1px solid #eee;">Qty</th>
            <th align="right" style="padding:6px 2px;border-bottom:1px solid #eee;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) =>
                `<tr>
              <td style="padding:6px 2px;">${item.name}</td>
              <td style="padding:6px 2px;text-align:center;">${
                item.quantity
              }</td>
              <td style="padding:6px 2px;text-align:right;">${formatCurrencyWithoutFormating(
                Number(item.price.toFixed(2))
              )}</td>
            </tr>`
            )
            .join("")}
          <tr>
              <td style="padding:8px 0;font-weight:bold;" colspan="2">Amount:</td>
              <td style="padding:8px 0;color:#3720f0;font-weight:bold;text-align:right;">${formatCurrencyWithoutFormating(
                Number(total)
              )}</td>
          </tr>
        </tbody>
      </table>

      <a href="${paymentLink}" style="display:inline-block;margin-top:1.2rem;background:#3720f0;color:#fff;text-decoration:none;font-weight:500;border-radius:5px;padding:10px 22px;">${
    status.toLowerCase() === "paid" ? "Confirm receipt" : "Pay now"
  }</a>
      <hr style="margin:2rem 0;">
      <div style="font-size:0.97rem;color:#555;">
        <p style="margin:0;">${companyName || "Your Company"}</p>
        <p style="margin:0;">${companyWebsite || ""}</p>
      </div>
    </div>
    <div style="background:#f0f4fc;padding:0.8rem;text-align:center;font-size:0.92rem;color:#888;">
      This is an automated invoice from PayPilot. Need help? Contact us at <a href="mailto:support@paypilot.com" style="color:#3720f0;text-decoration:underline">support@paypilot.com</a>
    </div>
  </div>
  `;
}
