import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../api/axiosInstance";
import { AxiosHeaders } from "../api/useAxiosHeaders";

export const useGetDashBoardData = () => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["dashboard data"],
    queryFn: async () =>
      Axiosinstance.get("/dashboard", { headers }).then((res) => res.data),
    refetchOnWindowFocus: true,
    // staleTime: 20 * 60 * 1000,
  });
};
