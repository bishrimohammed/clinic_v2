import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetVitalSigns = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", id, "Vital Signs"],
    queryFn: async () => {
      return await Axiosinstance.get(`medicalrecords/${id}/vital-signs`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
