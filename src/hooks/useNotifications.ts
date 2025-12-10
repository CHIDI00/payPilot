// useNotifications.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getNotifications from "@/services/apiNotifications";
import supabase from "@/services/supabase";
import { useCompanyInfo } from "@/features/acount/useCompanyInfo";

export function useNotifications() {
  const queryClient = useQueryClient();

  const { companyInfo } = useCompanyInfo();
  const companyId = companyInfo?.company_id;

  const { data, error } = useQuery({
    enabled: !!companyId,
    queryKey: ["notifications", companyId],
    queryFn: () => getNotifications(companyId as string),
    refetchInterval: 15000,
  });

  const notifications = data ?? [];
  const hasUnread = notifications.some((n) => !n.read);

  const { mutate: markAllRead } = useMutation({
    mutationFn: async () => {
      if (!companyId) return;
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("company_id", companyId)
        .eq("read", false);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", companyId] });
    },
  });

  return { notifications, hasUnread, markAllRead, error };
}
