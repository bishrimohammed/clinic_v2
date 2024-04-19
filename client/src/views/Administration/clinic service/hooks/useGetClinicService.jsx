import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetClinicService = (query) => {
  return useQuery({
    queryKey: ["clinic-services", query],
    queryFn: async () =>
      Axiosinstance.get("/service", { params: query }).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
