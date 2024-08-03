import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useGetActiveTreatment = () => {
  return useQuery({
    queryKey: ["activeTreatments"],
    queryFn: async () => {
      return await Axiosinstance.get(
        "/nursetreatments/getactive-treatment"
      ).then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
