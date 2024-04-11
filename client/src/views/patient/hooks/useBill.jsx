import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useHistoryBillDetail(historyId) {
  return useQuery({
    queryKey: ["billdetail", historyId],
    queryFn: async () =>
      Axiosinstance.get(`/bill/${historyId}`).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
  });
}
