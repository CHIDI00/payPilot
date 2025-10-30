import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../services/apiAuth";

// Follows your existing type structure
type UpdateUserArgs = Parameters<typeof updateUserProfile>[0];
type UpdateUserReturn = Awaited<ReturnType<typeof updateUserProfile>>;

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<UpdateUserReturn, Error, UpdateUserArgs>({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Error updating user profile");
    },
  });

  return {
    updateUser: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
