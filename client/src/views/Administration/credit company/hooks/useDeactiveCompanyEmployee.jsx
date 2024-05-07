import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeactiveCompanyEmployee = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(`/creditcompany/employee/${id}/deactivate`);
    },
    onSuccess: () => {
      toast.success("Employee deactivated successfully");
      queryClient.invalidateQueries({
        queryKey: ["CompanyEmployees", state.id],
        exact: true,
      });
    },
    onError: () => {
      toast.error("Error deactivating employee");
    },
  });
};
