import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CompanyDetails {
  logoBase64: string;
  companyName: string;
  companyPhone: string;
  companyWebsite: string;
}

// Returns a Blob for emailing—no UI/preview/download
export async function generateInvoicePdfBlob(
  invoiceElementId: string,
  company: CompanyDetails
): Promise<Blob> {
  // 1. Generate your jsPDF as before
  const element = document.getElementById(invoiceElementId);
  if (!element) throw new Error("Invoice element not found");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const padding = 10;
  const marginTop = 18;
  const logoWidth = 30;
  const logoHeight = 30;

  pdf.addImage(
    company.logoBase64,
    "PNG",
    pageWidth - logoWidth - padding,
    marginTop,
    logoWidth,
    logoHeight
  );
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(company.companyName, padding, marginTop + 12);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(60);
  pdf.text(`Phone: ${company.companyPhone}`, padding, marginTop + 29);
  pdf.text(company.companyWebsite, padding, marginTop + 36);
  pdf.setTextColor(0);

  const contentY = marginTop + 45;
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const imgProps = pdf.getImageProperties(imgData);
  const contentWidth = pageWidth - 2 * padding;
  let contentHeight = (imgProps.height * contentWidth) / imgProps.width;
  const maxHeight = pageHeight - contentY - padding;
  if (contentHeight > maxHeight) contentHeight = maxHeight;

  pdf.addImage(imgData, "PNG", padding, contentY, contentWidth, contentHeight);

  // 2. Return the PDF as a Blob for emailing
  return pdf.output("blob");
}
