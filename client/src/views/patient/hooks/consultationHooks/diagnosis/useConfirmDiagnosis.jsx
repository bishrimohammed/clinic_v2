import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { useLocation } from "react-router-dom";

export const useConfirmDiagnosis = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (diagnosisId) => {
      return await Axiosinstance.patch(
        `/medicalrecords/diagnosis/${diagnosisId}/confirm`,
        {},
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Diagnosis Confirmed");
      console.log(variables);
      queryClient.invalidateQueries({
        queryKey: ["Medical Record", state.medicalRecord_id, "Diagnosis"],
      });
    },
    onError: () => {
      toast.error("Diagnosis Not Confirmed");
    },
  });
};
