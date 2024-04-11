import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../api/axiosInstance";

export const useGetSubCities = () => {
  return useQuery({
    queryKey: ["subCities"],
    queryFn: async () => Axiosinstance.get("/subcity").then((res) => res.data),
    staleTime: 5 * 60 * 1000 * 1000,
  });
};
