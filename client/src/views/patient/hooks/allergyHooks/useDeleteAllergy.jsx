import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeleteAllergy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.delete(`/allergies/${data.id}`);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "allergies"],
      });
    },
  });
};
