import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useMedicalRecordDocument = (medicalRecordId) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Medical Record", medicalRecordId, "medical documents"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/investigation/${medicalRecordId}/documents`,
        {
          headers,
        }
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
