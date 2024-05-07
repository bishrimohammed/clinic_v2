import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useUpdateWorkHour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/user/doctor/${data.workHourId}/workhours`,
        data.formData
      );
    },
    onSuccess: (data) => {
      // console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
        exact: true,
      });
      toast.success("Work hour updated successfully");
    },
  });
};
