import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetImageCategory = () => {
  return useQuery({
    queryKey: ["image Category"],
    queryFn: async () =>
      Axiosinstance.get(`/service/imagingcategory`).then((res) => res.data),
    staleTime: 60 * 24 * 60 * 1000,
  });
};
