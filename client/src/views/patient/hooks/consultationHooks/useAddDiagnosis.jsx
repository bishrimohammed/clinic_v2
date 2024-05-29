import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddDiagnosis = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `medicalrecords/${data.medicalRecordId}/add_diagnosis`,
        data.formData,
        { headers }
      );
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Medical Record", variables?.medicalRecordId, "Diagnosis"],
      });
      toast.success("Diagnosis added successfully");
    },
  });
};
