import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useUpdateAllergy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/allergies/${data.allergyId}`,
        data.formData
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId, "allergies"],
        exact: true,
      });
      //   toast.success("Updated successfully");
    },
  });
};
