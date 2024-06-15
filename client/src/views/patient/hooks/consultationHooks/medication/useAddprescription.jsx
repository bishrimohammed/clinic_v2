import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const useAddprescription = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  // const { state } = useLocation();
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
    onSuccess: (data, varaibles) => {
      toast.success("Prescription added successfully  ");
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          varaibles.medicalRecord_id,
          "internal Prescription",
        ],
      });
    },
  });
};
