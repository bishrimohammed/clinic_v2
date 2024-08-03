import React from "react";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useExcuteAllMedicines = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (prescriptionId) => {
      return await Axiosinstance.patch(
        `/nursetreatments/${prescriptionId}/excutemedications`,
        {},
        { headers }
      );
    },
    onSuccess: (response, variables) => {
      // Your success callback here
      const { data } = response;
      queryClient.invalidateQueries({
        queryKey: ["activeTreatments"],
      });
      //   console.log(data);
      // queryClient.invalidateQueries
    },
    onError: (error) => {
      // Your error callback here
    },
  });
};
