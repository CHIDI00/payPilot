import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CompanyInfo } from "@/utils/types";
import { editCompany } from "../../services/apiCompany";
import toast from "react-hot-toast";

export function useEditCompany() {
  const queryClient = useQueryClient();

  const { mutate: editUserCompany, isPending: isEditing } = useMutation({
    mutationFn: ({
      id,
      newCompanyData,
    }: {
      id: string;
      newCompanyData: CompanyInfo;
    }) => editCompany(id, newCompanyData),
    onSuccess: () => {
      toast.success("Changes have been saved");
      queryClient.invalidateQueries({ queryKey: ["companyInfo"] });
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String("An error occured, failed to save edit."));
      }
    },
  });

  return { editUserCompany, isEditing };
}
