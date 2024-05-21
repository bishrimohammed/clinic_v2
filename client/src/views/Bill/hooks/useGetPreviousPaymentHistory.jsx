import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetPreviousPaymentHistory = (patientId) => {
  return useQuery({
    queryKey: ["PreviousPaymentHistory", patientId],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/payments/${patientId}/patient-payments`
      ).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
    // enabled: search!== "",
  });
};
