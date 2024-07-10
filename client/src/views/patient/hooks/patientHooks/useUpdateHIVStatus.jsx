import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useUpdateHIVStatus = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(
        `/patient/${data.patientId}/hiv`,
        data.formData,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      //   toast.success("HIV status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["patient general info", variables.patientId],
      });
    },
  });
};
// ["patient general info",7]
