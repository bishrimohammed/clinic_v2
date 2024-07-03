import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetRefferalNote = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", id, "Refferal Note"],
    queryFn: async () => {
      return await Axiosinstance.get(`/medicalrecords/${id}/refferal-note`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
