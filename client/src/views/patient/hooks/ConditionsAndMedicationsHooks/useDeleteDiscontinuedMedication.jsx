import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeleteDiscontinuedMedication = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.delete(
        `/conditions-medication/medical-record/${data.id}/discontinued-medication`,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "DiscontinuedMedication",
        ],
      });
    },
  });
};
