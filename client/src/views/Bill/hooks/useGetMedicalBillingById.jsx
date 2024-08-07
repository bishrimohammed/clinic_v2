import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetMedicalBillingById = (medicalBillingId) => {
  return useQuery({
    queryKey: ["Medical Billing", medicalBillingId],
    queryFn: async () => {
      return await Axiosinstance.get(`/payments/${medicalBillingId}`).then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
