import supabase from "./supabase";

export async function getInvoice() {
  const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    console.log(error);
    throw new Error("Invoice could not be loaded");
  }

  return data;
}
interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  streetAddress?: string;
  postCode?: string;
  city?: string;
  country?: string;
  clientName?: string;
  clientEmail?: string;
  clientStreetAddress?: string;
  clientCity?: string;
  clientPostCode?: string;
  clientCountry?: string;
  invoiceDate?: string;
  paymentTerms?: string;
  description?: string;

  // instead of single fields, use an array
  items: InvoiceItem[];
}

export async function createInvoice(
  newInvoice: Invoice
): Promise<Invoice[] | null> {
  const { data, error } = await supabase.from("invoices").insert([newInvoice]);

  if (error) {
    console.log(error);
    throw new Error("Invoice could not be created");
  }

  return data as Invoice[] | null;
}
