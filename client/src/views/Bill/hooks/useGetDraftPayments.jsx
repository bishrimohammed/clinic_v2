import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetOutStandingPayments = () => {
  return useQuery({
    queryKey: ["OutStanding payments"],
    queryFn: async () =>
      Axiosinstance.get(`/payments/outstanding`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
