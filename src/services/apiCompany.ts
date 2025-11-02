import toast from "react-hot-toast";
import supabase from "./supabase";
import type { CompanyInfo } from "../utils/types";

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
  id?: string;
  newCompany: CompanyInfo;
}

// ADD COMPANY INFO
export async function addCompany({
  id,
  newCompany,
}: AddCompany): Promise<CompanyInfo[] | null> {
  const { data, error } = await supabase
    .from("companyInfo")
    .insert([{ ...newCompany, user_id: id }])
    .select("*");

  if (error) {
    toast.error("Company could not be created");
    throw new Error("Company could not be created");
  }

  return data;
}

// EDIT COMPANY INFO
export async function editCompany(rowId: string, updatedFields: CompanyInfo) {
  const { data, error } = await supabase
    .from("companyInfo")
    .update(updatedFields)
    .eq("id", rowId)
    .select()
    .single();

  if (error) {
    toast.error("Company could not be Edited");
    throw new Error("Company could not be Editted");
  }

  return data;
}
