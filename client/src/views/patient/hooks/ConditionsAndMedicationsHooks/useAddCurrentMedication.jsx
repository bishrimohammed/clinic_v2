import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useAddCurrentMedication = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `/conditions-medication/medical-record/${data.medicalRecord_id}/current-medication`,
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
          variables.medicalRecord_id,
          "Current Medication",
        ],
        exact: true,
      });
      // console.log(data)
    },
  });
};
