import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.delete(`/appointment/${id}`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      toast.success("Appointment deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
