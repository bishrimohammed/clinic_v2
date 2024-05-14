import { useMutation } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useAddAppointment = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/appointment`, data);
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["appointments"],
      //   });
    },
  });
};
