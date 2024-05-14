import { useMutation } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useAddVitalSign = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      const vitals = data.vitals;
      return await Axiosinstance.post(
        `/medicalrecords/${data.medicalRecord_id}/addVitalSign`,
        vitals,
        { headers }
      );
    },
    onSuccess: () => {
      // console.log("success");
      toast.success("Vital Signs added successfully");
    },
  });
};
