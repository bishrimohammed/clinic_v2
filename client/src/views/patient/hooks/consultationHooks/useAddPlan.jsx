import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddPlan = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `medicalrecords/${data.medicalRecordId}/add-plan`,
        data.formData,
        { headers }
      );
    },
    onSuccess: async (data, variables) => {
      const { data: resData } = data;

      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecordId,
          "Medical Record Detial",
        ],
        exact: true,
      });
      toast.success("Plan added successfully ");
    },
    onError: (error) => {
      // handle error
      console.log("on error");
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
};
