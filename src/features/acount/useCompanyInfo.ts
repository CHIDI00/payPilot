import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo } from "../../services/apiCompany";

export function useCompanyInfo() {
  const { data, isPending } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  const companyInfo = Array.isArray(data) ? data[0] : null;
  console.log(companyInfo);

  return { companyInfo, isPending };
}
