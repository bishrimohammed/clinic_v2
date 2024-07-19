import { useMutation } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useConsultationSaveForLater = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `/temporarydata/${data.medicalRecordId}/consultation`,
        data.formData,
        { headers }
      );
    },
    onSuccess: (data, variables) => {},
    onError: () => {},
  });
};
