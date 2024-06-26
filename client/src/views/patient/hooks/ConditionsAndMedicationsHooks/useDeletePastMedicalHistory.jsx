import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeletePastMedicalHistory = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.delete(
        `/conditions-medication/patient/${data.id}/past-medical-history`,
        headers
      );
    },
    onSuccess: (data, variables) => {
      console.log(variables);
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "Past Medical History"],
      });
    },
  });
};
