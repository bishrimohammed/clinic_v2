import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useAddLabOrder = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  // console.log(header);
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `/medicalrecords/${data?.historyId}/addInvestigation`,
        data,
        header
      );
    },
    onSuccess: async (data, variables) => {
      const { data: resData } = data;
      console.log(variables);
      console.log(variables.historyId);
      queryClient.invalidateQueries({
        queryKey: [
          "MedicalHistory",
          variables.historyId,
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
