import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAdmitPatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (visitId) => {
      return await Axiosinstance.patch(`/patientvisits/${visitId}/admit`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UpcomingAssignedVisitToDoctor"],
      });
      toast.success(`Patient Admitted successfully`);
    },
  });
};
