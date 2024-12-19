import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
export const fetchAppointments = async (query) => {
  return await Axiosinstance.get("/appointment", { params: query }).then(
    (res) => res.data
  );
};
export const useGetAppointments = (query) => {
  return useQuery({
    queryKey: ["appointments", query],
    queryFn: async () => fetchAppointments(query),
    //    {
    //   return await Axiosinstance.get("/appointment", { params: query }).then(
    //     (res) => res.data
    //   );
    // },
    // make stale time 30 minutes
    staleTime: 30 * 60 * 1000,
  });
};
