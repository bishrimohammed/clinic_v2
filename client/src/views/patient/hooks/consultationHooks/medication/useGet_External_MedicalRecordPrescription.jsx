import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useGet_External_MedicalRecordPrescription = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", id, "external Prescription"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/medicalrecords/${id}/external_prescription`,
        {
          headers,
        }
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
