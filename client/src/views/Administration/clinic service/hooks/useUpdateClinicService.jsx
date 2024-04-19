import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useUpdateClinicService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data.serviceId);
      //   console.log(serviceId);
      const Data = data.Data;
      return await Axiosinstance.put(`/service/${data.serviceId}`, Data);
    },
    onSuccess: (data) => {
      //   console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["clinic-services"],
      });
      toast.success("Service updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
};
