import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditInvoice } from "../../services/apiInvoices";
import type { Invoice } from "../../utils/types";
import toast from "react-hot-toast";

export function useEditInvoice() {
  const queryClient = useQueryClient();

  const { mutate: editInvoice, isPending: isEditing } = useMutation({
    mutationFn: ({
      id,
      newInvoiceData,
    }: {
      id: string;
      newInvoiceData: Invoice;
    }) => createEditInvoice(id, newInvoiceData),
    onSuccess: () => {
      toast.success("Changes have been saved");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String(err));
      }
    },
  });

  return { editInvoice, isEditing };
}
