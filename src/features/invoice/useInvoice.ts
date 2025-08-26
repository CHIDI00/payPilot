import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../../services/apiInvoices";

interface Invoice {
  id: string;
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
  items?: { name: string; quantity: number; price: number }[];
  created_at?: string;
  user_id?: string;
}

const useInvoice = () => {
  const { isLoading, data } = useQuery<{ data: Invoice[] }>({
    queryKey: ["invoices"],
    queryFn: async () => ({ data: await getInvoice() }),
  });

  const invoices = data?.data ?? [];

  return { invoices, isLoading };
};

export default useInvoice;
