import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const fetchAllAssignedVisitsToDoctor = async (query, headers) => {
  return await Axiosinstance.get(`/patientvisits/doctor/assigned`, {
    params: query,
    headers,
  }).then((res) => res.data);
};

export const useGetPreviousAssignedVisitToDoctor = (query) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["PreviousAssignedVisitToDoctor", query],
    queryFn: async () => fetchAllAssignedVisitsToDoctor(query, headers),
    //   {
    //   return await Axiosinstance.get(`/patientvisits/doctor/assigned`, {
    //     params: query,
    //     headers,
    //   }).then((res) => res.data);
    // },
    enabled: !!query?.page,
    placeholderData: keepPreviousData,
    staleTime: 20 * 60 * 1000,
  });
};
