import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddPhysicalExamination = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `medicalrecords/${data.medicalRecordId}/add_physical_examination`,
        data.formData,
        { headers }
      ).then((res) => res.data);
    },
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables?.medicalRecordId,
          "Physical Examination",
        ],
      });
    },
  });
};
