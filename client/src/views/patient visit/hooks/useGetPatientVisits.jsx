import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const fetchAllVisits = async (query) => {
  return await Axiosinstance.get(`/patientvisits`, { params: query }).then(
    (res) => {
      // console.log("fetched patient visits");
      return res.data;
    }
  );
};

export const useGetPatientVisits = (query) => {
  return useQuery({
    queryKey: ["patient visits", query],
    queryFn: async () => fetchAllVisits(query),
    // make stale time 30 minutes
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000,
    enabled: !!query?.page,
  });
};
