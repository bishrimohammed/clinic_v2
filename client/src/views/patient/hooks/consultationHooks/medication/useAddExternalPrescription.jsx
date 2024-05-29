import { useMutation } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddExternalPrescription = () => {
  const { headers } = AxiosHeaders();
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
    onSuccess: () => {
      toast.success("Exrenal Prescription added successfully  ");
    },
  });
};
