import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
// import { toast } from "react-toastify";

export const useAddChiefComplaint = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `medicalrecords/${data.medicalRecordId}/add_chief_complaint`,
        data.formData,
        { headers }
      ).then((res) => res.data);
    },
    onSuccess: (data, variables) => {
      console.log(data);
      console.log(variables);
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables?.medicalRecordId,
          "Medical Record Detial",
        ],
      });
    },
  });
};
