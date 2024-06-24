import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddprogressNote = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `/progressnotes/${data.medicalRecordId}`,
        data.formData,
        {
          headers,
        }
      );
    },
    onSuccess: (data, variables) => {
      console.log(data);
      console.log(variables);
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "Progress Note",
        ],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "Saved for later Progress Note",
        ],
        exact: true,
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });
};
