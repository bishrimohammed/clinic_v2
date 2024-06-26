import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useDeleteSocialHistory = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.delete(`/patient/social-history/${data.id}`, {
        headers,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "Social History"],
        exact: true,
      });
    },
    onError: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["socialhistory"],
      //   })
    },
  });
};
