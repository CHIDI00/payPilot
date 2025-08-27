import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice as deleteInvoiceApi } from "../../services/apiInvoices";
import { useNavigate } from "react-router-dom";

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteInvoice } = useMutation({
    mutationFn: deleteInvoiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoice"],
      });
      navigate("/invoices");
    },
    onError: (err) => console.log(err.message),
  });

  return { deleteInvoice, isDeleting };
}
