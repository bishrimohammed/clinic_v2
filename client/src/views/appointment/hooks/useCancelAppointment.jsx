import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/appointment/${id}/cancel`,
        {},
        { headers }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments", { status: "" }],
      });
      toast.success("Appointment cancelled successfully");
    },
    onError: (err) => {
      //   console.log(err);
      toast.error("Appointment could not be cancelled");
    },
  });
};
