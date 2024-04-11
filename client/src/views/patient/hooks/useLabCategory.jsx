import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export function useLabCategory() {
  return useQuery({
    queryKey: ["LabCategory"],
    queryFn: async () =>
      Axiosinstance.get(`/service/getLabServiceCategories`).then(
        (res) => res.data
      ),
    staleTime: 60 * 24 * 60 * 1000,
  });
}
