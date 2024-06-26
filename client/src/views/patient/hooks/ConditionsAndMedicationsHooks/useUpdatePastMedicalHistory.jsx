import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdatePastMedicalHistory = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `conditions-medication/patient/${data.id}/past-medical-history`,
        data.newPastMedicalHistory,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      //   toast.success("Past medical history updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "Past Medical History"],
        exact: true,
      });
    },
  });
};
