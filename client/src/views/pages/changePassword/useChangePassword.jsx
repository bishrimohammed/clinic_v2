import { useMutation } from "@tanstack/react-query";
import React from "react";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
import Axiosinstance from "../../../api/axiosInstance";

export const useChangePassword = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(`/user/changepassword`, data, {
        headers,
      });
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });
      toast.success("Password updated successfully");
    },
  });
};
