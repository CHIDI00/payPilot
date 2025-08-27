// import { useQuery } from "@tanstack/react-query";
// import { getInvoice, getInvoiceById } from "../../services/apiInvoices";
// import { useParams } from "react-router-dom";

// interface Invoice {
//   id: string;
//   street_address?: string;
//   post_code?: string;
//   city?: string;
//   country?: string;
//   client_name?: string;
//   client_email?: string;
//   client_street_address?: string;
//   client_city?: string;
//   client_post_code?: string;
//   client_country?: string;
//   invoice_date?: string;
//   payment_terms?: string;
//   description?: string;
//   status: string;
//   items?: { name: string; quantity: number; price: number }[];
//   created_at?: string;
//   user_id?: string;
// }

// const useInvoice = () => {
//   const { invoiceId } = useParams<{ invoiceId: string }>();

//   const { isLoading, data } = useQuery<{ data: Invoice[] }>({
//     queryKey: ["invoices"],
//     queryFn: async () => ({ data: await getInvoiceById(invoiceId) }),
//   });

//   const invoices = data?.data ?? [];

//   return { invoices, isLoading };
// };

// export default useInvoice;

import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "../../services/apiInvoices";
import { useParams } from "react-router-dom";
import type { Invoice } from "../../helper/types";

const useInvoice = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const { isLoading, data: invoice } = useQuery<Invoice>({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoiceById(invoiceId!),
    enabled: !!invoiceId, // only run if invoiceId exists
  });

  return { invoice, isLoading };
};

export default useInvoice;
