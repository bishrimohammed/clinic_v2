import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetClinicService = () => {
  return useQuery({
    queryKey: ["clinic-services"],
    queryFn: async () => Axiosinstance.get("/service").then((res) => res.data),
  });
};
