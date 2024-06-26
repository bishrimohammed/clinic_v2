import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetSocialHistory = (patientId) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Patient", patientId, "Social History"],
    queryFn: async () => {
      return Axiosinstance.get(`/patient/${patientId}/social-history`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 20 * 60 * 1000,
    // enabled: search!== "",
  });
};
