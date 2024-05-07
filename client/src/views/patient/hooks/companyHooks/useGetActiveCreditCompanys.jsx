import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetActiveCreditCompanys = () => {
  return useQuery({
    queryKey: ["active-credit-companies"],
    queryFn: async () => {
      return await Axiosinstance.get("/creditcompany/active").then(
        (res) => res.data
      );
    },
    staleTime: 20 * 60 * 1000,
    // enabled: search !== "",
  });
};
