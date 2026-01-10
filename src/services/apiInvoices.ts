import toast from "react-hot-toast";
import type { Invoice, InvoiceItem } from "../utils/types"; // Ensure InvoiceItem is exported from types
import supabase from "./supabase";

// This prevents trying to save "items" into the invoices table (which would cause an error)
const separateItems = (invoiceData: Partial<Invoice>) => {
  const { invoice_items, ...invoiceDetails } = invoiceData;

  return {
    invoiceDetails,
    itemsToSave: invoice_items || [],
  };
};

export async function getInvoice() {
  // Added invoice_items(*) to fetch the linked data
  const { data, error } = await supabase
    .from("invoices")
    .select("*, invoice_items(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    toast.error("Invoice could not be loaded. Check connection!");
    throw new Error("Invoice load failed");
  }

  return data;
}

export async function createEditInvoice(
  id: string,
  newInvoice: Invoice
): Promise<Invoice[] | null> {
  // 1. Separate the array of items from the main invoice data
  const { invoiceDetails, itemsToSave } = separateItems(newInvoice);

  // CREATE NEW INVOICE
  if (!id) {
    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error("Not logged in");

    // Get Company Info
    const { data: company, error: companyError } = await supabase
      .from("companyInfo")
      .select("company_id")
      .eq("user_id", user.id)
      .single();

    if (companyError || !company) {
      toast.error("Company not found for this user");
      throw new Error("Company not found");
    }

    // A. Insert the Invoice (Main Details Only)
    const { data: savedInvoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert([
        {
          ...invoiceDetails,
          company_id: company.company_id,
          // total_amount will be auto-calculated by DB, but you can init it if you want
        },
      ])
      .select()
      .single();

    if (invoiceError) {
      console.error(invoiceError);
      toast.error("Invoice could not be created");
      throw new Error("Invoice creation failed");
    }

    // B. Insert the Items (Linked to the new invoice ID)
    if (itemsToSave.length > 0) {
      const formattedItems = itemsToSave.map((item: InvoiceItem) => ({
        invoice_id: savedInvoice.id, // Link to the new invoice
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(formattedItems);

      if (itemsError) {
        // Optional: Delete the ghost invoice if items fail
        await supabase.from("invoices").delete().eq("id", savedInvoice.id);
        console.error(itemsError);
        toast.error("Failed to save invoice items");
        throw new Error("Item creation failed");
      }
    }

    return [savedInvoice as Invoice];
  }

  // EDIT EXISTING INVOICE
  if (id) {
    // A. Update Invoice Details
    const { data: updatedInvoice, error: invoiceError } = await supabase
      .from("invoices")
      .update({ ...invoiceDetails })
      .eq("id", id)
      .select()
      .single();

    if (invoiceError) {
      toast.error("Invoice could not be edited");
      throw new Error("Invoice edit failed");
    }

    // B. Update Items (Strategy: Delete all old items, Insert all new ones)
    // This is safer/easier than checking which specific item changed.

    // 1. Delete old items
    const { error: deleteError } = await supabase
      .from("invoice_items")
      .delete()
      .eq("invoice_id", id);

    if (deleteError) throw deleteError;

    // 2. Insert new items
    if (itemsToSave.length > 0) {
      const formattedItems = itemsToSave.map((item: InvoiceItem) => ({
        invoice_id: id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(formattedItems);

      if (itemsError) throw itemsError;
    }

    return [updatedInvoice as Invoice];
  }

  return null;
}

export async function getInvoiceById(id: string) {
  // CHANGED: Added invoice_items(*)
  const { data, error } = await supabase
    .from("invoices")
    .select("*, invoice_items(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Invoice detail could not be loaded");
  }

  return data as Invoice;
}

// DELETE INVOICE
export async function deleteInvoice(id: string) {
  // No changes needed here!
  // Postgres "ON DELETE CASCADE" will automatically delete the linked items.
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

  if (error) throw error;

  return data;
}

export async function saveInvoiceDraft(newInvoice: Invoice) {
  // 1. Separate items
  const { invoiceDetails, itemsToSave } = separateItems(newInvoice);

  // 2. Save Invoice
  const { data: savedInvoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert([
      {
        ...invoiceDetails,
        status: "Draft",
      },
    ])
    .select()
    .single();

  if (invoiceError) throw invoiceError;

  // 3. Save Items
  if (itemsToSave.length > 0) {
    const formattedItems = itemsToSave.map((item: InvoiceItem) => ({
      invoice_id: savedInvoice.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(formattedItems);

    if (itemsError) throw itemsError;
  }
}
