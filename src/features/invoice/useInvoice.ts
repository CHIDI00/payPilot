import { useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "../../services/apiInvoices";
import { useParams } from "react-router-dom";
import type { Invoice } from "../../utils/types";

const useInvoice = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const { isLoading, data: invoice } = useQuery<Invoice>({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoiceById(invoiceId!),
    enabled: !!invoiceId,
  });

  return { invoice, isLoading };
};

export default useInvoice;
