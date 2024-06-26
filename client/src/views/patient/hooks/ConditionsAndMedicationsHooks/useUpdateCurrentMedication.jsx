import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdateCurrentMedication = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/conditions-medication/medical-record/${data.id}/current-medication`,
        data.formData,
        {
          headers,
        }
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "Current Medication",
        ],
      });
    },
  });
};
