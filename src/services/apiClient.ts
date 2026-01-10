import supabase from "./supabase";

// 1. UPDATE TYPE: Add 'total_amount' to reflect your DB change
type RawInvoice = {
  id?: string;
  status?: string | null;
  created_at?: string | null;
  total_amount?: number | null; // <-- This is the new calculated column
};

type RawClient = {
  id?: string;
  created_at?: string | null;
  invoices?: RawInvoice[] | null;
  [key: string]: unknown;
};

export async function getClients() {
  // 2. GET DATA: Select clients + total_amount from invoices
  const { data, error } = await supabase
    .from("clients")
    .select(
      `
      *,
      invoices (
        id,
        status,
        created_at,
        total_amount 
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Clients could not be loaded");
  }

  const safeData: RawClient[] = Array.isArray(data)
    ? (data as RawClient[])
    : [];

  // 3. TRANSFORM DATA: Calculate Outstanding, Paid, and Total
  const formattedData = safeData.map((client) => {
    const invoices = Array.isArray(client.invoices) ? client.invoices : [];

    // We can calculate all totals in one single loop (.reduce)
    const totals = invoices.reduce(
      (acc, inv) => {
        const amount = Number(inv.total_amount ?? 0);
        const status = (inv.status || "").toLowerCase();

        // A. Total Volume (Sum of all invoices)
        acc.total += amount;

        // B. Paid Volume
        if (status === "paid") {
          acc.paid += amount;
        }

        // C. Outstanding (Pending) Volume
        if (status === "pending") {
          acc.outstanding += amount;
        }

        return acc;
      },
      { total: 0, paid: 0, outstanding: 0 }
    );

    // Find the most recent invoice date for "Last Activity"
    const latestInvoice = invoices.reduce((latest: RawInvoice | null, inv) => {
      if (!inv || !inv.created_at) return latest;
      const t = new Date(inv.created_at).getTime();
      if (!latest || !latest.created_at) return inv;
      const lt = new Date(latest.created_at!).getTime();
      return t > lt ? inv : latest;
    }, null);

    const lastActivity = latestInvoice?.created_at ?? client.created_at ?? null;

    // Helper date for "30 days ago"
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter for invoices created in the last 30 days
    const recentInvoices = invoices.filter((inv) => {
      if (!inv.created_at) return false;
      return new Date(inv.created_at) > thirtyDaysAgo;
    });

    // Sum up revenue for those recent invoices
    const recentTotal = recentInvoices.reduce(
      (sum, inv) => sum + Number(inv.total_amount ?? 0),
      0
    );

    return {
      ...client,
      recent_invoice_count: recentInvoices.length,
      recent_total_billed: recentTotal,
      invoice_count: invoices.length,
      outstanding_balance: totals.outstanding,
      paid_amount: totals.paid,
      total_billed: totals.total,
      last_activity: lastActivity,
    };
  });

  return formattedData;
}

// CLIENT FORM DATA TYPE
export type CreateClientData = {
  name: string;
  email: string;
  phone_number?: string;
  website?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  note?: string;
};

// CREATE NEW CLIENT
export async function createClient(clientData: CreateClientData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a client");
  }

  const { data, error } = await supabase
    .from("clients")
    .insert([
      {
        ...clientData,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Client could not be created");
  }

  return data;
}

// UPDATE EXISTING CLIENT
export async function updateClient(
  id: string,
  clientData: Partial<CreateClientData>
) {
  const { data, error } = await supabase
    .from("clients")
    .update(clientData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Client could not be updated");
  }

  return data;
}
