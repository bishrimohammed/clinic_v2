import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useGetAllPrescribedMedicine = (prescriptionId) => {
  return useQuery({
    queryKey: ["prescriptions", prescriptionId],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/nursetreatments/getprescribedmedicine/${prescriptionId}`
      ).then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
