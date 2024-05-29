import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
export const useGetChiefComplaint = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", id, "ChiefComplaint"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `medicalrecords/${id}/get_chief_complaint`,
        { headers }
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
