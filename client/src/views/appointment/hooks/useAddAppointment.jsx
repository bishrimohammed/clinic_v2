import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAddAppointment = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/appointment`, data, { headers });
    },
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      toast.success(data.data.message);
    },
  });
};
