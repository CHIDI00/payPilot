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
  // 1. Create/edit Invoice
  // A) CREATE
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

  // B) EDIT
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
