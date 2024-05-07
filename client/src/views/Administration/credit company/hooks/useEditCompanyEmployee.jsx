import { useMutation } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useEditCompanyEmployee = () => {
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/creditcompany/employee/${data.employeeId}`,
        data.formData
      );
    },
    onSuccess: (data) => {
      console.log(data);

      // queryClient.invalidateQueries({
      //     queryKey: ["credit Companies", { status: "" }],
      //     exact: true,
      // })
    },
    onError: async (err) => {
      console.log(err.response);
    },
  });
};
