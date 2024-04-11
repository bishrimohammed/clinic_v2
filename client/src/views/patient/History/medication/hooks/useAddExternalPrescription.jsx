import React from "react";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddExternalPrescription = () => {
  const headers = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        "/patienthistory/external_prescription",
        data,
        headers
      ).then((res) => res.data);
    },
    onSuccess: async (data, variables) => {
      toast.success("successfully prescribed");
      // console.log(variables);
      queryClient.invalidateQueries({
        queryKey: [
          "MedicalHistory",
          variables.historyId,
          "ExternalPrescription",
        ],
        exact: true,
      });
    },
    onError: async (error) => {
      toast.success(error?.response?.data.message);
    },
  });
};
