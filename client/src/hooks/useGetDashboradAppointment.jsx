import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "../api/useAxiosHeaders";
import Axiosinstance from "../api/axiosInstance";

export const useGetDashboradAppointment = (query) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["dashboard data", "appointment", query],
    queryFn: async () =>
      Axiosinstance.get("/dashboard/appointment", {
        headers,
        params: query,
      }).then((res) => res.data),
    //   refetchOnWindowFocus: true,
    staleTime: 20 * 60 * 1000,
  });
};
