import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useAddPastMedicalHistory = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `conditions-medication/patient/${data.patientId}/past-medical-history`,
        data.newPastMedicalHistory,
        {
          headers,
        }
      );
    },
    onSuccess: (data, variables) => {
      // toast.success("Patient past medical history added successfully");
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "Past Medical History"],
        exact: true,
      });
    },
  });
};
