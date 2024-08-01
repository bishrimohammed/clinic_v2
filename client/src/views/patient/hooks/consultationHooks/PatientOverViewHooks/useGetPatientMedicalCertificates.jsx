import { useQuery } from "@tanstack/react-query";
// import React from 'react'
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetPatientMedicalCertificates = ({ patientId }) => {
  return useQuery({
    queryKey: ["Patient", patientId, "medical certificate"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/patientoverview/${patientId}/medical-certificates`
      ).then((response) => response.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval: 1000 * 60 * 15 // 15 minutes
  });
};
