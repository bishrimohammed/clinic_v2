import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetProgressNote = (medicalRecordId) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", medicalRecordId, "Progress Note"],
    queryFn: async () => {
      return await Axiosinstance.get(`progressnotes/${medicalRecordId}`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
