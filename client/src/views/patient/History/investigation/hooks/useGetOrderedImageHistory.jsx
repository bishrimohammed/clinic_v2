import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export default function useGetOrderedImageHistory(historyId) {
  const headers = AxiosHeaders();
  return useQuery({
    queryKey: ["MedicalHistory", historyId, "Ordered Imageing for history"],
    queryFn: async () =>
      Axiosinstance(`/lab/orderedImageStudies/${historyId}`, { headers }).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 1000,
  });
}
