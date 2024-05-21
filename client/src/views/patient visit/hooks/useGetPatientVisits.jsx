import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetPatientVisits = (query) => {
  return useQuery({
    queryKey: ["patient visits", query],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientvisits`, { params: query }).then(
        (res) => {
          console.log("fetched patient visits");
          return res.data;
        }
      );
    },
    // make stale time 30 minutes
    staleTime: 30 * 60 * 1000,
    // enabled: search !== "",
  });
};
