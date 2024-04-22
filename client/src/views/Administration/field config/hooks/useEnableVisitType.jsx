import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useEnableVisitType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(`/visittype/activate/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["visit Type"],
        exact: true,
      });
      toast.success("Visit type enabled successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
};
