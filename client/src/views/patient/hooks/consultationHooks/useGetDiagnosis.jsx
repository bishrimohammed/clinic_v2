import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetDiagnosis = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", id, "Diagnosis"],
    queryFn: async () => {
      return await Axiosinstance.get(`/medicalrecords/${id}/get_diagnosis`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
