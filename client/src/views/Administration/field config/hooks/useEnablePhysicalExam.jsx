import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useEnablePhysicalExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(
        `/fields/physicalExaminationField/${id}/enable`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["physical_examination_field"],
        exact: true,
      });
      toast.success("Physical Examination Field enabled Successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
};
