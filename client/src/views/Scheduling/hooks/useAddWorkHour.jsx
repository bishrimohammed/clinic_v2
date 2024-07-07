import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAddWorkHour = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(`/user/doctor/workhours`, data, { headers });
    },
    onSuccess: () => {
      toast.success("Work hour added successfully");
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
        exact: true,
      });
      // navigate(-1);
    },
    // onError: () => {
    //   //   toast.error("Error adding work hour");
    // },
  });
};
