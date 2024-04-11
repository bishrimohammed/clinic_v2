import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const useAddClinicInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/clinicprofile", data).then((res) => res.data);
    },
    mutationKey: "addClinicInfo",
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["Clinic Information"],
        exact: true,
      });
      navigate(-1);
    },
    onError: async (err) => {
      console.log("error");
      console.log(err.response.data.message);
      // console.log();
    },
  });
};
