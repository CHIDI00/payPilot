import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../../services/apiInvoices";
import type { Invoice } from "../../utils/types";

export const useInvoiceOnDashboard = () => {
  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ["invoices-overview"],
    queryFn: () => getInvoice(),
  });

  return { invoices, isLoading };
};
