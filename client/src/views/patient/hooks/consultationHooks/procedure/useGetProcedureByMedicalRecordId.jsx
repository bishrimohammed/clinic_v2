import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetProcedureByMedicalRecordId = (medicalRecordId) => {
  return useQuery({
    queryKey: ["Medical Record", medicalRecordId, "procedure"],
    queryFn: async () => {
      return await Axiosinstance.get(`/procedures/${medicalRecordId}`).then(
        (result) => result.data
      );
      //   return []
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// export const useGetMedicalRecordPrecodure = (medicalRecordId) => {
//   return
// };
