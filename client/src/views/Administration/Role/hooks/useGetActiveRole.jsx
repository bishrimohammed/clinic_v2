import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetActiveRole = () => {
  return useQuery({
    queryKey: ["Active Roles"],
    queryFn: async () => {
      return Axiosinstance.get("/role/active").then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
