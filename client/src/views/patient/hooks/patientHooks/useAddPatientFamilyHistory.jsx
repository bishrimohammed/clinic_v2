import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useAddPatientFamilyHistory = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `/patient/${data.patientId}/family-history`,
        data.newFamilyHistory,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Patient family history added successfully");
      queryClient.invalidateQueries({
        queryKey: ["patient general info", variables.patientId],
        exact: true,
      });
    },
  });
};
