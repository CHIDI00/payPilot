import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";
import type { CompanyInfo } from "../utils/types";

export async function getCompanyInfo(): Promise<CompanyInfo[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("companyInfo")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    toast.error("Info could not be loaded.\n Check connection!");
    throw new Error("Info could not be loaded");
  }

  return data as CompanyInfo[];
}

interface AddCompany {
  id?: string;
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
    toast.error("Company could not be created");
    throw new Error("Company could not be created");
  }

  return data as CompanyInfo[] | null;
}

export async function editCompany(
  rowId: string,
  updatedFields: CompanyInfo
): Promise<CompanyInfo> {
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

  return data as CompanyInfo;
}

interface UpdateCompanyLogoProps {
  companyId: string;
  logo: File;
}

export async function updateCompanyLogo({
  companyId,
  logo,
}: UpdateCompanyLogoProps) {
  const logoFileName = `company-logo-${companyId}-${Date.now()}`;
  const { error: logoStorageError } = await supabase.storage
    .from("companyLogo")
    .upload(logoFileName, logo);

  if (logoStorageError) throw new Error(logoStorageError.message);

  const logoUrl = `${supabaseUrl}/storage/v1/object/public/companyLogo/${logoFileName}`;

  const { error: companyUpdateError } = await supabase
    .from("companyInfo")
    .update({ logo: logoUrl })
    .eq("id", companyId);

  if (companyUpdateError) throw new Error(companyUpdateError.message);

  return logoUrl;
}

// update paystack keys using user_id
export async function updatePaystackKeys(input: {
  paystack_public_key: string;
  paystack_secret_key: string;
}) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("companyInfo")
    .update({
      paystack_public_key: input.paystack_public_key,
      paystack_secret_key: input.paystack_secret_key,
    })
    .eq("user_id", user.id);

  if (error) throw error;
}
