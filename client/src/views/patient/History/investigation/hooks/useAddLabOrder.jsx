import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useAddLabOrder = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  // console.log(header);
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `/medicalrecords/${data?.medicalRecord_id}/addInvestigation`,
        data.formData,
        { headers }
      );
    },
    onSuccess: async (data, variables) => {
      const { data: resData } = data;
      console.log(variables);
      console.log(variables.historyId);
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
