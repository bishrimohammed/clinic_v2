import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { useLocation } from "react-router-dom";
export const useAddCompanyEmployee = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (data) => {
      // console.log(data);
      return Axiosinstance.post("/creditcompany/employee", data);
    },
    onSuccess: async (response) => {
      const { data } = response;
      // console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["CompanyEmployees", state.id],
        exact: true,
      });
      toast.success("Employee Added Successfully");
    },
    onError: async (err) => {
      // console.log(err.response);
      toast.error(err.response.data.message, {});
    },
  });
};
