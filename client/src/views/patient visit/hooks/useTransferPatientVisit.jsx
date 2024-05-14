import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useTransferPatientVisit = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      // console.log(data);
      return await Axiosinstance.patch(
        `/patientvisits/${data.visitId}/transfer`,
        data.formData,
        { headers }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient visits", { stage: "", status: "", vistiType: "" }],
      });
    },
  });
};
