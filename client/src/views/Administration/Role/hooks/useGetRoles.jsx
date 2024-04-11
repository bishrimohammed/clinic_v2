import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
// import Axiosinstance from "../../../../api/axiosInstance";

export const useGetRoles = (query) => {
  return useQuery({
    queryKey: ["Roles", { status: query.status }],
    queryFn: async () => {
      return Axiosinstance.get("/role", { params: query }).then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
