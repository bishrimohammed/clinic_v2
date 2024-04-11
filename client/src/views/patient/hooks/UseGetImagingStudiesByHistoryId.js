import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function UseGetImagingStudiesByHistoryId(historyId) {
  return useQuery({
    queryKey: ["MedicalHistory", "imaging studies", historyId],
    queryFn: async () =>
      Axiosinstance.get(`/lab/orderedImageStudies/${historyId}`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 1000,
  });
}
