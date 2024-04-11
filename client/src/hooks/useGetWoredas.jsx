import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../api/axiosInstance";

export const useGetWoredas = () => {
  return useQuery({
    queryKey: ["woredas"],
    queryFn: async () => Axiosinstance.get("/woreda").then((res) => res.data),
    staleTime: 5 * 1000 * 1000,
    // persister: true,
  });
};
