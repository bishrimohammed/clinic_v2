import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeleteCurrentMedication = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.delete(
        `/conditions-medication/medical-record/${data.id}/current-medication`,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "Current Medication",
        ],
        exact: true,
      });
    },
  });
};
