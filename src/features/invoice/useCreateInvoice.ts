import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditInvoice } from "../../services/apiInvoices";
import type { Invoice } from "../../utils/types";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  const { mutate: createInvoice, isPending: isCreating } = useMutation({
    mutationFn: (variables: { id: string; newInvoice: Invoice }) =>
      createEditInvoice(variables.id, variables.newInvoice),
    onSuccess: () => {
      toast.success("An invoice have be created");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => toast.error("Connection Error, failed to create invoice"),
  });

  return { createInvoice, isCreating };
}
