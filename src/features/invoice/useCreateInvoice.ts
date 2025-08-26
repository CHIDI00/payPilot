import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditInvoice } from "../../services/apiInvoices";
import type { Invoice } from "../../helper/types";

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  const { mutate: createInvoice, isPending: isCreating } = useMutation({
    mutationFn: (variables: { id: string; newInvoice: Invoice }) =>
      createEditInvoice(variables.id, variables.newInvoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (err) => console.log(err.message),
  });

  return { createInvoice, isCreating };
}
