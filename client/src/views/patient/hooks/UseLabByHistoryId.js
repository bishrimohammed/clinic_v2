import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function UseLabByHistoryId(historyId) {
  return useQuery({
    queryKey: ["MedicalHistory", "lab details", historyId],
    queryFn: async () =>
      Axiosinstance.get(`/lab/orderedLabInvestigation/${historyId}`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 1000,
  });
}
