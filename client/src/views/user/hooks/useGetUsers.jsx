import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetUsers = () => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      Axiosinstance.get(`/user`, { ...header }).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
