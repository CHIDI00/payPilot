import supabase from "./supabase";

type RawInvoice = {
  id?: string;
  amount?: number | null;
  status?: string | null;
  created_at?: string | null;
};

type RawClient = {
  id?: string;
  created_at?: string | null;
  invoices?: RawInvoice[] | null;
  [key: string]: unknown;
};

export async function getClients() {
  // 1. GET DATA: Select all clients AND their related invoices
  const { data, error } = await supabase
    .from("clients")
    .select(
      `
      *,
      invoices (
        id,
        status,
        created_at
      )
    `
    )
    .order("created_at", { ascending: false });

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Clients could not be loaded");
  }

  const safeData: RawClient[] = Array.isArray(data)
    ? (data as RawClient[])
    : [];

  // 2. TRANSFORM DATA: Calculate the totals for the UI
  const formattedData = safeData.map((client) => {
    const invoices = Array.isArray(client.invoices) ? client.invoices : [];

    // Sum up only the 'pending' invoices (case-insensitive)
    const pendingInvoices = invoices.filter(
      (inv) => (inv.status || "").toString().toLowerCase() === "pending"
    );

    const outstandingBalance = pendingInvoices.reduce((sum, inv) => {
      const amt = Number(inv.amount ?? 0) || 0;
      return sum + amt;
    }, 0);

    // Find the most recent invoice date (invoices may have null/undefined created_at)
    const latestInvoice = invoices.reduce((latest: RawInvoice | null, inv) => {
      if (!inv || !inv.created_at) return latest;
      const t = new Date(inv.created_at).getTime();
      if (!latest || !latest.created_at) return inv;
      const lt = new Date(latest.created_at!).getTime();
      return t > lt ? inv : latest;
    }, null);

    const lastActivity = latestInvoice?.created_at ?? client.created_at ?? null;

    return {
      ...client,
      outstanding_balance: outstandingBalance,
      last_activity: lastActivity,
    };
  });

  console.log(formattedData);

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
  // 1. Get the current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a client");
  }

  // 2. Insert the data AND the user_id
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
