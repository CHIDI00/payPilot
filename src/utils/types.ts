export interface InvoiceItem {
  id: string;
  invoice_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  invoice_id: string;
  public_uuid: string;
  street_address?: string;
  post_code?: string;
  city?: string;
  state: string;
  country?: string;
  client_name?: string;
  client_email?: string;
  client_street_address?: string;
  client_state: string;
  client_city?: string;
  client_post_code?: string;
  client_country?: string;
  invoice_date?: string;
  payment_terms?: string;
  description?: string;
  accountNo?: number;
  status: string;
  invoice_items: InvoiceItem[];
  total_amount: number;
  created_at?: string;
  user_id?: string;
  company_id: string;
}

export interface CompanyInfo {
  id?: string;
  created_at: string;
  user_id: string;
  company_id: string;
  public_uuid: string;
  logo: string;
  companyName: string;
  companyEmail: string;
  companyLine: number;
  companyStreet: string;
  companyCity: string;
  companyState: string;
  companyCountry: string;
  companyTaxId: string;
  companyWebsite: string;
  subscription_plan: string;
  paystack_public_key: string;
  paystack_secret_key: string;
}

export interface Notification {
  id: string;
  created_at: string;
  title: string;
  type: string;
  read: boolean;
  body: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone_number: number; // or string, depending on your DB
  address_line_1: string;
  address_line_2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  created_at: string;

  // Calculated fields (joined from invoices)
  outstanding_balance: number;
  paid_amount: number;
  total_billed: number;
  invoice_count: number;
  last_activity?: string | null;

  // NEW: "Past 30 Days" Stats
  recent_invoice_count: number;
  recent_total_billed: number;
}
