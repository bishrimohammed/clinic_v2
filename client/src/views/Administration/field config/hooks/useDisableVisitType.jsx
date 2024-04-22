import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useDisableVisitType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(`/visittype/deactivate/${id}`);
    },
    onSuccess: () => {
      toast.success("Visit Type disabled successfully");
      queryClient.invalidateQueries({
        queryKey: ["visit Type"],
        exact: true,
      });
    },
    onError: (err) => {
      //   console.log("Vital sign not enabled");
      //   console.log(err);
      toast.error(err.response.data.message);
    },
  });
};
