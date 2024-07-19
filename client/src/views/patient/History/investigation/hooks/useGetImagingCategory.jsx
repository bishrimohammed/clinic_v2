import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetImagingCategory = () => {
  return useQuery({
    queryKey: ["Imaging Studies Category"],
    queryFn: async () => {
      return await Axiosinstance.get(
        "service/getImagingServiceCategories"
      ).then((res) => res.data);
    },
    // refetchInterval: 600000 // 10 minutes
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
