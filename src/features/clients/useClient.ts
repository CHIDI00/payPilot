import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/apiClient";
import type { Client } from "@/utils/types";

export function useClients() {
  const {
    isLoading,
    data: clients,
    error,
  } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => (await getClients()) as unknown as Client[],
  });

  return { isLoading, clients, error };
}
