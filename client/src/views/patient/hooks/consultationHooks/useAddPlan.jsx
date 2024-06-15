import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useAddPlan = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `medicalrecords/${data.medicalRecordId}/add-plan`,
        data,
        { headers }
      ).then((res) => res.data);
    },
    onSuccess: async (data, variables) => {
      const { data: resData } = data;

      queryClient.invalidateQueries({
        queryKey: [
          "Medical Record",
          variables.medicalRecord_id,
          "Ordered Lab Investigations",
        ],
        exact: true,
      });
      toast.success("investigations successfully submited");
    },
    onError: (error) => {
      // handle error
      console.log("on error");
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
};
