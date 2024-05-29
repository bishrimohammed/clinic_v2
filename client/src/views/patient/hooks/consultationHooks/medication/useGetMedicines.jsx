import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
export const useGetMedicines = () => {
  return useQuery({
    queryKey: ["Medicines"],
    queryFn: async () => {
      return await Axiosinstance.get("/inventory/instock-medicines").then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000,
    // enabled: search!== "",
  });
};
