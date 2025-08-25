import { createClient, SupabaseClient } from "@supabase/supabase-js";
export const supabaseUrl: string = "https://itktbkqrupkkslfvlkht.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0a3Ria3FydXBra3NsZnZsa2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjkxMTYsImV4cCI6MjA3MTQ0NTExNn0.DjCbvaGIiEV_TW71ckecuW_miMrbr06zg22oZSzkhDc";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
