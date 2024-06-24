import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetActivePermissions = () => {
  return useQuery({
    queryKey: ["ActivePermissions"],
    queryFn: async () => {
      return await Axiosinstance.get("permissions/active").then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
