import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDisablePhysicalExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(
        `/fields/physicalExaminationField/${id}/disable`
      );
    },
    onSuccess: () => {
      toast.success("Physical Examination Field disabled successfully");
      queryClient.invalidateQueries({
        queryKey: ["physical_examination_field"],
        exact: true,
      });
    },
    onError: (err) => {
      //   console.log("Vital sign not enabled");
      console.log(err);
      //   toast.error(err.response.data.message);
    },
  });
};
