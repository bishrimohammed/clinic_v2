import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetAcvtivePhysicalExamination = () => {
  return useQuery({
    queryKey: ["AcvtivePhysicalExamination"],
    queryFn: async () => {
      return await Axiosinstance.get(
        "fields/physicalExaminationFields/active"
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
