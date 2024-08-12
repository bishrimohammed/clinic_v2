import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetPatientProcedures = (patientId) => {
  return useQuery({
    queryKey: ["Patient", patientId, "procedure"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/patientoverview/${patientId}/procedure`
      ).then((response) => response.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval: 1000 * 60 * 15 // 15 minutes
  });
};
