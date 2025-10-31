import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CompanyInfo } from "../../utils/types";
import { addCompany } from "../../services/apiCompany";

export function useAddCompany() {
  const queryClient = useQueryClient();
  const { mutate: addUserCompany, isPending: isAdding } = useMutation({
    mutationFn: ({ id, newCompany }: { id: string; newCompany: CompanyInfo }) =>
      addCompany({ id, newCompany }),
    onSuccess: () => {
      queryClient.invalidateQueries(["companyInfo"]);
    },
    onError: (error) => {
      console.error("Failed to add company:", error);
    },
  });
  return { addUserCompany, isAdding };
}
