import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useGetExternalPrescription = (historyId) => {
  let header = AxiosHeaders();

  return useQuery({
    queryKey: ["MedicalHistory", historyId, "ExternalPrescription"],
    queryFn: async () =>
      Axiosinstance.get(
        `/patienthistory/${historyId}/getExternalPrescription`,

        { ...header }
      ).then((res) => res.data),
    staleTime: 5 * 60 * 100,
    retry: 1,
  });
};
