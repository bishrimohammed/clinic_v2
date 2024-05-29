import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export default function useOrdered_Lab_Investigations(historyId) {
  // console.log("useOrdered_Lab_Investigations");
  const headers = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", historyId, "Ordered Lab Investigations"],
    queryFn: async () =>
      Axiosinstance.get(`medicalrecords/${historyId}/investigation`, {
        headers,
      }).then((res) => {
        // console.log("useOrdered_Lab_Investigations feat");
        // console.log(res.data);
        return res.data;
      }),
    staleTime: 5 * 60 * 1000,
  });
}
