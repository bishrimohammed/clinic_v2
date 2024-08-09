import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetPatientResentData = (patientId) => {
  return useQuery({
    queryKey: ["Patient", patientId, "resent data"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/patientoverview/${patientId}/resent`
      ).then((res) => res.data);
    },
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    // re
  });
};
