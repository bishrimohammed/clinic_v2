import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetServiceItems = (serviceId) => {
  return useQuery({
    queryKey: ["service-items", serviceId],
    queryFn: async () => {
      console.log("service-items featching");
      return Axiosinstance.get(`/service/${serviceId}/serviceitems`).then(
        (res) => res.data
      );
    },
  });
};
