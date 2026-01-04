export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoice_id: string;
  public_uuid: string;
  street_address?: string;
  post_code?: string;
  city?: string;
  country?: string;
  client_name?: string;
  client_email?: string;
  client_street_address?: string;
  client_city?: string;
  client_post_code?: string;
  client_country?: string;
  invoice_date?: string;
  payment_terms?: string;
  description?: string;
  status: string;
  items: InvoiceItem[];
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
