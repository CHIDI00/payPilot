import toast from "react-hot-toast";
import type { Invoice } from "../utils/types";
import supabase from "./supabase";

export async function getInvoice() {
  const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    toast.error("Invoice could not be loaded.\n Check connection!");
    throw new Error("Invoice could not be loaded");
  }

  return data;
}

export async function createEditInvoice(
  id: string,
  newInvoice: Invoice
): Promise<Invoice[] | null> {
  // CREATE
  if (!id) {
    const { data, error } = await supabase
      .from("invoices")
      .insert([{ ...newInvoice, status: "Draft" }])
      .select()
      .single();

    if (error) {
      console.log(error);

      toast.error("Invoice could not be created");
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
      toast.error("Invoice could not be Edited");
      throw new Error("Invoice could not be Editted");
    }

    return data ? [data as Invoice] : null;
  }

  return null;
}

// FETCH SINGLE INVOICE BY ID'
export async function getInvoiceById(id: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    toast.error("Invoice detail could not be loaded");
    throw new Error("Invoice detail could not be loaded");
  }

  return data as Invoice;
}

// DELETE INVOICE
export async function deleteInvoice(id: string) {
  const { data, error } = await supabase.from("invoices").delete().eq("id", id);

  if (error) {
    toast.error("Failed to delete invoice");
    throw new Error("Invoice could not be Deleted");
  }

  return data;
}

export async function markInvoiceAsPaid(id: string) {
  const { data, error } = await supabase
    .from("invoices")
    .update({ status: "Paid" })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveInvoiceDraft(data: Invoice) {
  const { error } = await supabase.from("invoices").insert([
    {
      ...data,
      status: "Draft",
    },
  ]);
  if (error) throw error;
}

// export async function getUserInvoices() {
//   const { data: userData } = await supabase.auth.getUser();
//   const userId = userData?.user?.id;
//   if (!userId) throw new Error("User not authenticated");

//   const { data, error } = await supabase
//     .from("invoices")
//     .select("*")
//     .eq("user_id", userId);

//   if (error) {
//     toast.error("Invoice could not be loaded.\nCheck connection!");
//     throw new Error("Invoice could not be loaded");
//   }
//   return data;
// }

// export async function createEditInvoice(
//   id: string,
//   newInvoice: Invoice
// ): Promise<Invoice[] | null> {
//   const { data: userData } = await supabase.auth.getUser();
//   const userId = userData?.user?.id;
//   if (!userId) throw new Error("User not authenticated");

//   // CREATE
//   if (!id) {
//     const { data, error } = await supabase
//       .from("invoices")
//       .insert([{ ...newInvoice, user_id: userId, status: "Draft" }])
//       .select()
//       .single();

//     if (error) {
//       toast.error("Invoice could not be created");
//       throw new Error("Invoice could not be created");
//     }

//     return data ? [data as Invoice] : null;
//   }

//   // EDIT (should check ownership in RLS, see below)
//   if (id) {
//     const { data, error } = await supabase
//       .from("invoices")
//       .update({ ...newInvoice })
//       .eq("id", id)
//       .eq("user_id", userId) // enforce only editing own invoices
//       .select()
//       .single();

//     if (error) {
//       toast.error("Invoice could not be Edited");
//       throw new Error("Invoice could not be Editted");
//     }

//     return data ? [data as Invoice] : null;
//   }

//   return null;
// }

// export async function getInvoiceById(id: string) {
//   const { data: userData } = await supabase.auth.getUser();
//   const userId = userData?.user?.id;
//   if (!userId) throw new Error("User not authenticated");

//   const { data, error } = await supabase
//     .from("invoices")
//     .select("*")
//     .eq("id", id)
//     .eq("user_id", userId) // only fetch own invoice
//     .single();

//   if (error) {
//     toast.error("Invoice detail could not be loaded");
//     throw new Error("Invoice detail could not be loaded");
//   }
//   return data as Invoice;
// }

// export async function deleteInvoice(id: string) {
//   const { data: userData } = await supabase.auth.getUser();
//   const userId = userData?.user?.id;
//   if (!userId) throw new Error("User not authenticated");

//   const { data, error } = await supabase
//     .from("invoices")
//     .delete()
//     .eq("id", id)
//     .eq("user_id", userId);

//   if (error) {
//     toast.error("Failed to delete invoice");
//     throw new Error("Invoice could not be Deleted");
//   }
//   return data;
// }

// export async function markInvoiceAsPaid(id: string) {
//   const { data: userData } = await supabase.auth.getUser();
//   const userId = userData?.user?.id;
//   if (!userId) throw new Error("User not authenticated");

//   const { data, error } = await supabase
//     .from("invoices")
//     .update({ status: "Paid" })
//     .eq("id", id)
//     .eq("user_id", userId)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// }

// export async function saveInvoiceDraft(data: Invoice) {
//   const { data: userData } = await supabase.auth.getUser();
//   const userId = userData?.user?.id;
//   if (!userId) throw new Error("User not authenticated");

//   const { error } = await supabase.from("invoices").insert([
//     {
//       ...data,
//       user_id: userId,
//       status: "Draft",
//     },
//   ]);
//   if (error) throw error;
// }
