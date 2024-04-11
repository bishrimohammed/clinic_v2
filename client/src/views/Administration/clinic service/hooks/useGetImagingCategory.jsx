import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetImagingCategory = () => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["ImagingCategory"],
    queryFn: async () =>
      Axiosinstance.get("/service/getImagingServiceCategories", {
        ...header,
      }).then((res) => res.data),
    staleTime: 20 * 60 * 1000,
  });
};
