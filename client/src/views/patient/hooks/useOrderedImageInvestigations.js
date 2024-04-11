import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useOrderedImageInvestigations(historyId) {
  return useQuery({
    queryKey: ["MedicalHistory", "OrderedImageInvestigations", historyId],
    queryFn: async () =>
      Axiosinstance.get(`/lab/orderedImageStudies/${historyId}`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 1000,
  });
}
