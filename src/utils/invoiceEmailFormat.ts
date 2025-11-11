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
  total,
  formatCurrency,
  invoice_date,
  companyWebsite,
  companyName,
  items,
}: {
  logo?: string;
  companyLogo: string;
  client_name?: string;
  invoice_id: string | number;
  total: number;
  formatCurrency: (amount: number) => string;
  invoice_date: string | Date | null;
  companyWebsite?: string;
  companyName?: string;
  items: InvoiceItem[];
}) {
  return `
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#222;">
    <div style="width:100%;display:flex;justify-content:space-between;align-items:center;background:#9277ff;padding:1.5rem 2rem;text-align:center;margin-bottom:2rem;border-radius:8px;">
      <p style="font-size:1.2rem;color:#fff;">Invoice by</p>
      <h1 style="color:#fff;font-size:1.9rem;margin:0;">PayPilot</h1>
    </div>
    <div style="background:#fff;padding:2rem;border:2px solid gray;border-radius:8px;">
      <div style="text-align:right;margin-bottom:10px;">
        <img src="${
          logo || companyLogo
        }" alt="Company Logo" style="height:50px;margin:0 auto 8px auto;">
      </div>
      <h2 style="font-size:1.3rem;margin-bottom:5px;">Hello ${
        client_name || "Customer"
      },</h2>
      <p style="font-size:1rem;">Please find your invoice below.</p>
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
              <td style="padding:6px 2px;text-align:right;">${formatCurrency(
                item.price
              )}</td>
            </tr>`
            )
            .join("")}
          <tr>
              <td style="padding:8px 0;font-weight:bold;" colspan="2">Amount:</td>
              <td style="padding:8px 0;color:#3720f0;font-weight:bold;text-align:right;">${formatCurrency(
                Number(total)
              )}</td>
          </tr>
        </tbody>
      </table>

      <a href="${companyWebsite}" style="display:inline-block;margin-top:1.2rem;background:#3720f0;color:#fff;text-decoration:none;font-weight:500;border-radius:5px;padding:10px 22px;">Pay Now</a>
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
