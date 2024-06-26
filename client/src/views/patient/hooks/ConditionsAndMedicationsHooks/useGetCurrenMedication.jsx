import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetCurrenMedication = (medicalRecordId) => {
  return useQuery({
    queryKey: ["Medical Record", medicalRecordId, "Current Medication"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `conditions-medication/medical-record/${medicalRecordId}/current-medication`
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
