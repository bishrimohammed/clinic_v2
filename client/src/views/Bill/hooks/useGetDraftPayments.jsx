import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetOutStandingPayments = (query) => {
  return useQuery({
    queryKey: ["OutStanding payments", query],
    queryFn: async () =>
      Axiosinstance.get(`/payments/outstanding`, { params: query }).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
