import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetLaboratory = () => {
  return useQuery({
    queryKey: ["clinic Laboratory service"],
    queryFn: async () =>
      Axiosinstance.get(`service/get_lab_service`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
