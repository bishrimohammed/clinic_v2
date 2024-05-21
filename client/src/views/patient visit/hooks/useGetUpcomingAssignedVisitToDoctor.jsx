import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetUpcomingAssignedVisitToDoctor = (query) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["UpcomingAssignedVisitToDoctor", query],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientvisits/doctor/upcoming`, {
        params: query,
        headers: headers,
      }).then((res) => res.data);
    },
    staleTime: 20 * 60 * 1000,
    // keepPreviousData: true,
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    // refetchOnWindowFocus: true,
  });
};
