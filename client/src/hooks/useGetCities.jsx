import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../api/axiosInstance";

export const useGetCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => Axiosinstance.get("/city").then((res) => res.data),
    staleTime: 5 * 1000 * 1000,
    // persister: true,
  });
};
