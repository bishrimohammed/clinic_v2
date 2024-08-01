// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetPatientLabs = ({ patientId }) => {
  return useQuery({
    queryKey: ["Patient", patientId, "labs"],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientoverview/${patientId}/labs`).then(
        (response) => response.data
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval: 1000 * 60 * 15 // 15 minutes
  });
};
