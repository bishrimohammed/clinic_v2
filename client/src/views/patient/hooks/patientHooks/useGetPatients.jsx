import Axiosinstance from "../../../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetPatients = (query) => {
  return useQuery({
    queryKey: ["Patients", query],
    queryFn: async () => {
      return Axiosinstance.get(`/patient`, {
        params: query,
      })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    staleTime: 20 * 60 * 1000,
    // enabled: search !== "",
  });
};
