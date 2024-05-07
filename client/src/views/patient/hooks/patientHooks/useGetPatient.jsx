import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";

export const useGetPatient = (patientId) => {
  return useQuery({
    queryKey: ["Patient", patientId],
    queryFn: async () => {
      return Axiosinstance.get(`/patient/${patientId}`).then((res) => res.data);
    },

    staleTime: 20 * 60 * 1000,
    // enabled: search !== "",
  });
};
