import { useMutation } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";

export const useEnableVitalSign = () => {
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(`/fields/vitalsigns/${id}/enable`);
    },
    onSuccess: () => {
      console.log("Vital sign enabled");
    },
    onError: () => {
      console.log("Vital sign not enabled");
    },
  });
};
