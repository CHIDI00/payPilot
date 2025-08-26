import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditInvoice } from "../../services/apiInvoices";
import type { Invoice } from "../../helper/types";

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
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(String(err));
      }
    },
  });

  return { editInvoice, isEditing };
}
