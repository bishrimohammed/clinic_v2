import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useUpdateDisability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(
        `/patient/${data.patientId}/disability`,
        data.formData
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
