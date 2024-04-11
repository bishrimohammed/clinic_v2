import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";

export const useGetMedicines = () => {
  return useQuery({
    queryKey: ["medicine list"],
    queryFn: async () =>
      Axiosinstance.get(`/medication`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
