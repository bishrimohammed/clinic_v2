import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useActivateCompanyEmployee = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (employeeId) => {
      return await Axiosinstance.patch(
        `/creditcompany/employee/${employeeId}/activate`,
        {},
        { headers }
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
