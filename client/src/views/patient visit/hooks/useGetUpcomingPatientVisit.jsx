import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetUpcomingPatientVisit = (query) => {
  return useQuery({
    queryKey: ["UpcomingPatientVisit", query],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientvisits/upcoming`, {
        params: query,
      }).then((res) => res.data);
    },
    staleTime: 20 * 60 * 1000,
    // keepPreviousData: true,
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    // refetchOnReconnect: true,
    // refetchOnReconnectInterval: 10000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // refetchOnReconnectInterval: 10000,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
  });
};
