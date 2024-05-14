import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddEmployeeToDuty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (employeeDuty) => {
      return await Axiosinstance.post("/dutyprogram/assign", employeeDuty);
    },
    onSuccess: (data, variables, context) => {
      //   console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["DutyProgram", variables.duty_id],
      });
      toast.success("Employee added to duty successfully");
    },
  });
};
