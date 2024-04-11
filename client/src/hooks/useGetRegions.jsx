import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../api/axiosInstance";

export const useGetRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: async () => Axiosinstance.get("/region").then((res) => res.data),
    staleTime: 5 * 1000 * 1000,
  });
};
