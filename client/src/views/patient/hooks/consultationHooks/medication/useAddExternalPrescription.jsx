import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddExternalPrescription = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `medicalrecords/${data.medicalRecord_id}/add_external_prescription`,
        data.formData,
        {
          headers,
        }
      );
    },
    onSuccess: (data, varaibles) => {
      toast.success("Exrenal Prescription added successfully");
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          varaibles.medicalRecord_id,
          "external Prescription",
        ],
      });
    },
  });
};
