import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/appointment/${data.appointmentId}`,
        data.formData,
        { headers }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      toast.success("Appointment updated successfully");
    },
  });
};
