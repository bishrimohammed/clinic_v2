import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useUpdateWorkHour = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/user/doctor/${data.workHourId}/workhours`,
        data.formData,
        { headers }
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
