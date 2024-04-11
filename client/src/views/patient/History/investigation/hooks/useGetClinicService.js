import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetClinicService = (serviceType) => {
  return useQuery({
    queryKey: ["clinic service", serviceType],
    queryFn: async () =>
      Axiosinstance.get(`service/withdetail?query=${serviceType}`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
