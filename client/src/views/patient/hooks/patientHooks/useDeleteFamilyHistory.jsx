import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeleteFamilyHistory = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.delete(`/patient/family-history/${data.id}`, {
        headers,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "Family History"],
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
