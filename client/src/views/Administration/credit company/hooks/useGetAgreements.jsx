import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetAgreements = (companyId) => {
  return useQuery({
    queryKey: ["agreements", companyId],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/creditcompany/${companyId}/agreements`
      ).then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
