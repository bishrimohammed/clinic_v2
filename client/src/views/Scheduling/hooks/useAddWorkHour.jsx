import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const useAddWorkHour = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(`/user/doctor/workhours`, data);
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
