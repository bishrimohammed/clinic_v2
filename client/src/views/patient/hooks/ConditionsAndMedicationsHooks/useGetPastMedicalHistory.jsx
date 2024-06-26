import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetPastMedicalHistory = (patientId) => {
  return useQuery({
    queryKey: ["Patient", patientId, "Past Medical History"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `conditions-medication/patient/${patientId}/past-medical-history`
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
