import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdateHIVStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(
        `/patient/${data.patientId}/hiv`,
        data.formData
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
