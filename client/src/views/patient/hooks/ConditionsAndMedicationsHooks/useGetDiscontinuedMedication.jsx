import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetDiscontinuedMedication = (medicalRecordId) => {
  return useQuery({
    queryKey: ["Medical Record", medicalRecordId, "DiscontinuedMedication"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `conditions-medication/medical-record/${medicalRecordId}/discontinued-medication`
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
