import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useAddDiscontinuedMedication = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `conditions-medication/medical-record/${data.medicalRecordId}/discontinued-medication`,
        data.newDiscontinuedMedication,
        {
          headers,
        }
      );
    },
    onSuccess: async (data, variables) => {
      //   console.log(variables);
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
