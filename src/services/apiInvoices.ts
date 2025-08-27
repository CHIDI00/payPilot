import type { Invoice } from "../helper/types";
import supabase from "./supabase";

export async function getInvoice() {
  const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    console.log(error);
    throw new Error("Invoice could not be loaded");
  }

  return data;
}

export async function createEditInvoice(
  id: string,
  newInvoice: Invoice
): Promise<Invoice[] | null> {
  //  Create/edit Invoice
  // CREATE
  if (!id) {
    const { data, error } = await supabase
      .from("invoices")
      .insert([{ ...newInvoice }])
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Invoice could not be created");
    }

    return data ? [data as Invoice] : null;
  }

  // EDIT
  if (id) {
    const { data, error } = await supabase
      .from("invoices")
      .update({ ...newInvoice })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error("Invoice could not be Editted");
    }

    return data ? [data as Invoice] : null;
  }

  return null;
}

// fetch single invoice by `id`
export async function getInvoiceById(id: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Invoice could not be loaded");
  }

  return data as Invoice;
}

// Delete Invoice
export async function deleteInvoice(id: string) {
  const { data, error } = await supabase.from("invoices").delete().eq("id", id);

  if (error) {
    throw new Error("Invoice could not be Deleted");
  }

  return data;
}
