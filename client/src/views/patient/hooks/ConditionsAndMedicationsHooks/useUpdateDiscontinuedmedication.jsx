import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdateDiscontinuedmedication = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/conditions-medication/medical-record/${data.id}/discontinued-medication`,
        data.newDiscontinuedMedication,
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
        exact: true,
      });
    },
  });
};
