import { useMutation } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddprescription = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      const prescription = data.formData;
      return await Axiosinstance.post(
        `medicalrecords/${data.medicalRecord_id}/add-prescription`,
        prescription,
        {
          headers,
        }
      );
    },
    onSuccess: () => {
      toast.success("Prescription added successfully  ");
    },
  });
};
