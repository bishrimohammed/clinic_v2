import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useGetOrderedTests = (id) => {
  return useQuery({
    queryKey: ["OrderedTests", id],
    queryFn: async () => {
      return await Axiosinstance.get(`investigation/${id}/labtests`).then(
        (res) => res.data
      );
    },

    staleTime: 20 * 60 * 1000,
    // enabled: search!== "",
  });
};
