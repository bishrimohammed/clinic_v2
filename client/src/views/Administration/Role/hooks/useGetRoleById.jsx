import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
export const useGetRoleById = (roleId) => {
  return useQuery({
    queryKey: ["Roles", roleId],
    queryFn: async () => {
      return Axiosinstance.get(`/role/${roleId}`).then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
