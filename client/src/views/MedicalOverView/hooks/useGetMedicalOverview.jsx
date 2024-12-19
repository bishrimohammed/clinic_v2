import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
export const fetchActiveMedicalRecord = async (query, headers) => {
  // const { headers } = AxiosHeaders();
  return await Axiosinstance.get(`/medicalrecords/overview`, {
    params: query,
    headers,
  }).then((res) => res.data);
};
export const useGetMedicalOverview = (query) => {
  const { headers } = AxiosHeaders();
  // console.log(query);
  return useQuery({
    queryKey: ["Medical Record Overviews", query],
    queryFn: async () => fetchActiveMedicalRecord(query, headers),
    //   {
    //   return Axiosinstance.get("/medicalrecords/overview", { headers }).then(
    //     (res) => res.data
    //   );
    // },
    placeholderData: keepPreviousData,
    staleTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!query?.page,
  });
};
