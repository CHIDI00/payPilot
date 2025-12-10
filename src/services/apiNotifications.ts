import type { Notification } from "@/utils/types";
import supabase from "./supabase";

export default async function getNotifications(
  companyId: string
): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return data ?? [];
}
