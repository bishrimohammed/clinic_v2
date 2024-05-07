import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { useLocation } from "react-router-dom";

export const useActivateCompanyEmployee = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (employeeId) => {
      return await Axiosinstance.patch(
        `/creditcompany/employee/${employeeId}/activate`
      );
    },
    onSuccess: () => {
      toast.success("Employee is activated successfully");
      queryClient.invalidateQueries({
        queryKey: ["CompanyEmployees", state.id],
        exact: true,
      });
    },
    onError: () => {
      toast.error("Employee is not activated successfully");
    },
  });
};
