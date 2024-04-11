import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetHistoryVitals = (historyId) => {
  return useQuery({
    queryKey: ["MedicalHistory", historyId, "vitals"],
    queryFn: async () => {
      return Axiosinstance.get(`patienthistory/${historyId}/getvitals`).then(
        (res) => res.data
      );
    },
    staleTime: 5 * 60 * 1000,
  });
};
