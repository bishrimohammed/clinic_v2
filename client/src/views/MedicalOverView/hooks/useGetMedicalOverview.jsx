import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetMedicalOverview = () => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record Overviews"],
    queryFn: async () => {
      return Axiosinstance.get("/medicalrecords/overview", { headers }).then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
