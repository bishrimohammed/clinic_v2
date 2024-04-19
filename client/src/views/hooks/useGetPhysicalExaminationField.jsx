import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";

export const useGetPhysicalExaminationField = () => {
  return useQuery({
    queryKey: ["physical_examination_field"],
    queryFn: async () => {
      return Axiosinstance.get("/fields/physicalExaminationFields").then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
