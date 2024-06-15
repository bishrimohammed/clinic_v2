import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useAddPatientPastMedicalHistory = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `patient/${data.patientId}/add_past_medical_history`,
        data.formData,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Patient past medical history added successfully");
      queryClient.invalidateQueries({
        queryKey: ["patient general info", variables.patientId],
        exact: true,
      });
    },
  });
};
