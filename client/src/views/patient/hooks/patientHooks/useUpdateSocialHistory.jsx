import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdateSocialHistory = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/patient/social-history/${data.id}`,
        data.formData,
        { headers }
      );
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
