import { useMutation } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useSaveProgressForLater = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `/temporarydata/${data.medicalRecord_id}/progressnote`,
        data.formData,
        { headers }
      );
    },
    onSuccess: () => {
      toast.success("Progress Note saved successfully");
    },
    onError: (err) => {
      toast.error("Progress Note could not be saved");
      console.log(err);
    },
  });
};
