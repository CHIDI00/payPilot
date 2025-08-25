import supabase from "./supabase";

export async function getInvoice() {
  const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    console.log(error);
    throw new Error("Invoice could not be loaded");
  }

  return data;
}
