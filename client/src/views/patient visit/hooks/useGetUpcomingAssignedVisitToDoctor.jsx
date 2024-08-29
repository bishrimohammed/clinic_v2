import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
export const fetchActiveAssignedVisits = async (query, headers) => {
  // console.log(headers);
  // const { headers } = AxiosHeaders();
  return await Axiosinstance.get(`/patientvisits/doctor/upcoming`, {
    params: query,
    headers: { ...headers },
  }).then((res) => res.data);
};
export const useGetUpcomingAssignedVisitToDoctor = (query) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["UpcomingAssignedVisitToDoctor", query],
    queryFn: async () => fetchActiveAssignedVisits(query, headers),
    //   {
    //   return await Axiosinstance.get(`/patientvisits/doctor/upcoming`, {
    //     params: query,
    //     headers: headers,
    //   }).then((res) => res.data);
    // },
    // meta: headers,
    placeholderData: keepPreviousData,
    staleTime: 20 * 60 * 1000,
    enabled: !!query.page,
    // keepPreviousData: true,

    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    // refetchOnWindowFocus: true,
  });
};
