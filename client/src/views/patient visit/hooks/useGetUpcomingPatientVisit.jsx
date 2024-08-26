import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
export const fetchUpcomingVisits = async (query) => {
  return await Axiosinstance.get(`/patientvisits/upcoming`, {
    params: query,
  }).then((res) => res.data);
};
export const useGetUpcomingPatientVisit = (query) => {
  return useQuery({
    queryKey: ["UpcomingPatientVisit", query],
    queryFn: async () => fetchUpcomingVisits(query),
    placeholderData: keepPreviousData,
    staleTime: 20 * 60 * 1000,
    enabled: !!query.page,
  });
};
