import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/services/apiClient";
import type { CreateClientData } from "@/services/apiClient";
import toast from "react-hot-toast";

export function useCreateClient() {
  const queryClient = useQueryClient();

  const { mutate: createNewClient, isPending: isCreating } = useMutation({
    mutationFn: (clientData: CreateClientData) => createClient(clientData),
    onSuccess: () => {
      toast.success("Client created successfully");
      // INVALIDATE CLIENTS QUERY TO REFETCH THE LIST
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create client");
    },
  });

  return { createNewClient, isCreating };
}
