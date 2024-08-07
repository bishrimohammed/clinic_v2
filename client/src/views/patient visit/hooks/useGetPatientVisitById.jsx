import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetPatientVisitById = (visitId) => {
  return useQuery({
    queryKey: ["Patient Visit", visitId],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientvisits/${visitId}`).then(
        (res) => res.data
      );
    },
    staleTime: 20 * 60 * 1000,
    keepPreviousData: true, // keep the previous data when the query is refreshed
  });
};
