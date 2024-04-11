import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useGetHistoryPrescription(historyId) {
  return useQuery({
    queryKey: ["MedicalHistory", historyId, "Prescription"],
    queryFn: async () =>
      Axiosinstance(`/prescriptions/${historyId}`).then((res) => res.data),
    staleTime: 20 * 60 * 1000,
  });
}
