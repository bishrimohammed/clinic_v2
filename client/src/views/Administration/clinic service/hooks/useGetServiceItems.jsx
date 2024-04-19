import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetServiceItems = (serviceId, query) => {
  return useQuery({
    queryKey: ["service-items", serviceId, query],
    queryFn: async () => {
      console.log("service-items featching");
      return Axiosinstance.get(`/service/${serviceId}/serviceitems`, {
        params: query,
      }).then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
