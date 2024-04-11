import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["Roles"],
    queryFn: async () => {
      return Axiosinstance.get("/role").then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
