import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetCreditCompany = (query) => {
  return useQuery({
    queryKey: ["credit Companies", query],
    queryFn: async () => {
      return await Axiosinstance.get("/creditcompany", { params: query }).then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
