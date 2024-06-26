import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetFamilyHistory = (patientId) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Patient", patientId, "Family History"],
    queryFn: async () => {
      return Axiosinstance.get(`/patient/${patientId}/family-history`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 20 * 60 * 1000,
  });
};
