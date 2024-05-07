import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/patient/${data.patientId}`,
        data.formData
      ).then((res) => res.data);
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);
      queryClient.invalidateQueries({
        queryKey: [
          "patients",
          { is_new: "", is_credit: "", gender: "", status: "" },
        ],
      });
      toast.success("Patient updated successfully");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message);
    },
  });
};
