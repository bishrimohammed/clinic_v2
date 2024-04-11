import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useMedication() {
  return useQuery({
    queryKey: ["Medication list"],
    queryFn: async () =>
      Axiosinstance.get(`/medication`).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
  });
}
