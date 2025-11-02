import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CompanyDetails {
  logoBase64: string;
  companyName: string;
  companyPhone: string;
  companyWebsite: string;
}

export async function downloadInvoiceAsPDF(
  invoiceElementId: string,
  fileName: string,
  company: CompanyDetails
) {
  const element = document.getElementById(invoiceElementId);
  if (!element) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const padding = 10; // mm, common left/right margin for invoice content
  const marginTop = 18; // mm, gap at top (header)
  const logoWidth = 30;
  const logoHeight = 30;

  // --- Company Logo (top right) ---
  pdf.addImage(
    company.logoBase64,
    "PNG",
    pageWidth - logoWidth - padding,
    marginTop,
    logoWidth,
    logoHeight
  );

  // --- Company Name (big + bold, top left) ---
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(company.companyName, padding, marginTop + 12);

  // --- Address, Phone, Website (smaller, below name) ---
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(60);
  pdf.text(`Phone: ${company.companyPhone}`, padding, marginTop + 29);
  pdf.text(company.companyWebsite, padding, marginTop + 36);
  pdf.setTextColor(0);

  // --- Invoice content image (centered with padding, below header) ---
  // Move invoice content lower, under header info
  const contentY = marginTop + 45;

  // Render invoice DOM as PNG
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const imgProps = pdf.getImageProperties(imgData);

  // Width for content (left/right padding)
  const contentWidth = pageWidth - 2 * padding;
  // Height calculated to keep aspect ratio, with max height (bottom margin)
  let contentHeight = (imgProps.height * contentWidth) / imgProps.width;
  const maxHeight = pageHeight - contentY - padding;
  if (contentHeight > maxHeight) contentHeight = maxHeight;

  pdf.addImage(imgData, "PNG", padding, contentY, contentWidth, contentHeight);

  pdf.save(fileName + ".pdf");
}
