import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetUnits = () => {
  return useQuery({
    queryKey: ["Units"],
    queryFn: async () =>
      await Axiosinstance.get(`/units`).then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000,
  });
};
