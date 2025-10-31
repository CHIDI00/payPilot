import toast from "react-hot-toast";
import supabase from "./supabase";
import type { CompanyInfo } from "../../utils/types";

const { data } = await supabase.auth.getUser();
console.log(data);

const userId = data?.user?.id;

export async function getCompanyInfo() {
  const { data, error } = await supabase
    .from("companyInfo")
    .select("*")
    .eq("user_id", userId);

  console.log(data);

  if (error) {
    toast.error("Info could not be loaded.\n Check connection!");
    throw new Error("Info could not be loaded");
  }

  return data;
}

interface AddCompany {
  id: string;
  newCompany: CompanyInfo;
}

export async function addCompany({
  id,
  newCompany,
}: AddCompany): Promise<CompanyInfo[] | null> {
  const { data, error } = await supabase
    .from("companyInfo")
    .insert([{ ...newCompany, user_id: id }])
    .select("*");

  if (error) {
    console.error("Error adding company:", error.message);
    return null;
  }

  return data;
}
