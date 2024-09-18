import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useUploadDocument = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `medicalrecords/${data.medicalRecordId}/document`,
        data.formData,
        {
          headers,
        }
      );
    },
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "medical documents",
        ],
      });
      toast.success("Document uploaded successfully");
    },
  });
};
