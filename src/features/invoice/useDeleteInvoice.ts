import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice as deleteInvoiceApi } from "../../services/apiInvoices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteInvoice } = useMutation({
    mutationFn: deleteInvoiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
      navigate("/invoices", { state: { wasDeleted: true } });
      toast.success("Invoice deleted successfully");
    },
    onError: () => toast.error("There was an error deleting this invoice"),
  });

  return { deleteInvoice, isDeleting };
}
