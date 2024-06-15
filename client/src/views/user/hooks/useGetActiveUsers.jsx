import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetActiveUsers = () => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Active users"],
    queryFn: async () =>
      Axiosinstance.get(`/user/active`, { headers }).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
