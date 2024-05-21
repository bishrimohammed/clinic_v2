import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useAddPatientSocialHistory = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return Axiosinstance.post(
        `/patient/${data.patientId}/social-history`,
        data.newSocialHistory,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Patient social history added successfully");
      queryClient.invalidateQueries({
        queryKey: ["patient general info", variables.patientId],
        exact: true,
      });
    },
  });
};
