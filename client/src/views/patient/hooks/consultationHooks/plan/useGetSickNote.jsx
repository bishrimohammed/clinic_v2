import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useGetSickNote = (id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", id, "Sick Note"],
    queryFn: async () => {
      return await Axiosinstance.get(`/medicalrecords/${id}/sick-note`, {
        headers,
      }).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
