import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useGetProcedures = () => {
  return useQuery({
    queryKey: ["procedures"],
    queryFn: async () => {
      return await Axiosinstance.get("/service/procedures").then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000,
    // refetchInterval: 60000, // refetch every minute
  });
};
