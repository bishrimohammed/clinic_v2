import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetDraftPayments = () => {
  return useQuery({
    queryKey: ["Draft payments"],
    queryFn: async () =>
      Axiosinstance.get(`/bill/draft`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
