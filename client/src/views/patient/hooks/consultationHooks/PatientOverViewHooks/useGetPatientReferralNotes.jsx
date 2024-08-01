// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetPatientReferralNotes = ({ patientId }) => {
  return useQuery({
    queryKey: ["Patient", patientId, "referralNotes"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/patientoverview/${patientId}/referral-notes`
      ).then((response) => response.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval: 1000 * 60 * 15 // 15 minutes
  });
};
