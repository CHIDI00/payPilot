import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCompanyLogo } from "../../services/apiCompany";

type UpdateLogoArgs = Parameters<typeof updateCompanyLogo>[0];

export function useUpdateCompanyLogo() {
  const queryClient = useQueryClient();

  const mutation = useMutation<string, Error, UpdateLogoArgs>({
    mutationFn: updateCompanyLogo,
    onSuccess: () => {
      toast.success("Logo updated");
      queryClient.invalidateQueries({ queryKey: ["companyInfo"] });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Error updating company logo");
    },
  });

  return {
    updateLogo: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
