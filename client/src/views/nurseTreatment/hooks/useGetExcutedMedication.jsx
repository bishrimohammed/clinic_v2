import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetExcutedMedication = (prescriptionId) => {
  return useQuery({
    queryKey: ["prescriptions", prescriptionId, "excuted"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/nursetreatments/getprescribedmedicine/${prescriptionId}/excuted`
      ).then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
