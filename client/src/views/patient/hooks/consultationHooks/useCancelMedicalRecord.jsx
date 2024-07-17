import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { useNavigate } from "react-router-dom";

export const useCancelMedicalRecord = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (medicalRecordId) => {
      return await Axiosinstance.delete(
        `/medicalrecords/${medicalRecordId}/cancel-medical-record`,
        {
          headers,
        }
      );
    },
    onSuccess: (data, variables) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["Medical Record", variables.medicalRecordId],
      //   });
      queryClient.removeQueries(["Medical Record", variables.medicalRecordId]);
      navigate(-1);
    },
  });
};
