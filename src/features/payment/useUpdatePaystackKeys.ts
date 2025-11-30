import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePaystackKeys } from "../../services/apiCompany";

export function useUpdatePaystackKeys() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePaystackKeys,
    onSuccess: () => {
      toast.success("Payment keys saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["companyInfo"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
