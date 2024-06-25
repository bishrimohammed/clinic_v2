import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetPatientAllergy = (patientId) => {
  return useQuery({
    queryKey: ["Patient", patientId, "allergies"],
    queryFn: async () => {
      return Axiosinstance.get(`/allergies/${patientId}/patient`).then(
        (res) => res.data
      );
    },
    staleTime: 20 * 60 * 1000,
    // enabled: search!== "",
  });
};
