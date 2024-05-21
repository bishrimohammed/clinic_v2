import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
export const useAddVitalSign = () => {
  const { headers } = AxiosHeaders();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      // const vitals = data.vitals;
      return await Axiosinstance.post(
        `/medicalrecords/${state.medicalRecord_id}/addVitalSign`,
        data,
        { headers }
      );
    },
    onSuccess: () => {
      // console.log("success");
      queryClient.invalidateQueries({
        queryKey: [
          "UpcomingPatientVisit",
          { stage: "", status: "", vistiType: "" },
        ],
      });
      toast.success("Vital Signs added successfully");
    },
  });
};
