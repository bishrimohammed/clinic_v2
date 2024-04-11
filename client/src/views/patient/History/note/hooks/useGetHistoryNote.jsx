import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useGetHistoryNote = (historyId) => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["MedicalRecord", historyId, "MedicalRecordDetail"],
    queryFn: async () =>
      Axiosinstance.get(`/medicalrecords/${historyId}/getMedicalRecordDetail`, {
        ...header,
      }).then((res) => res.data),
    staleTime: 5 * 60 * 100,
    //retry: 1,
  });
};
