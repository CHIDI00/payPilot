export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoice_id: string;
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
}
