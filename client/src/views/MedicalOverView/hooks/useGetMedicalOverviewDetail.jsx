import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetMedicalOverviewDetail = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record Overviews", id],
    queryFn: async () => {
      return Axiosinstance.get(`/medicalrecords/${id}/overview`, {
        headers,
      }).then((res) => res.data);
    },
  });
};
