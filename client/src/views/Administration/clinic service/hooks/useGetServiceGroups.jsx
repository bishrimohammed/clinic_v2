import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
// import Axiosinstance from "../../../../api/axiosInstance";

export const useGetServiceGroups = (serviceId) => {
  return useQuery({
    queryKey: ["ServiceGroups", serviceId],
    queryFn: async () => {
      return Axiosinstance.get(`/service/${serviceId}/servicegroup`).then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
