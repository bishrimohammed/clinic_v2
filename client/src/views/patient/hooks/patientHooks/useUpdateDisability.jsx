import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useUpdateDisability = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(
        `/patient/${data.patientId}/disability`,
        data.formData,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      //   toast.success("HIV status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId],
      });
    },
  });
};
