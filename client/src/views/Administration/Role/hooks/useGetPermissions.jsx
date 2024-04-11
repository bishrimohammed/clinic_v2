import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetPermissions = () => {
  return useQuery({
    queryKey: ["Permissions"],
    queryFn: async () => {
      return Axiosinstance.get("/permissions").then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
