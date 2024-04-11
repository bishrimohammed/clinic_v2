import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddInternalPrescription = () => {
  const headers = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/prescriptions", data, headers);
    },
    onSuccess: async (data, variables) => {
      toast.success("successfully prescribed");
      // console.log(variables);
      queryClient.invalidateQueries({
        queryKey: [
          "MedicalHistory",
          variables.historyId,
          "InternalPrescription",
        ],
        exact: true,
      });
    },
    onError: async (error) => {
      toast.success(error?.response?.data.message);
    },
  });
};
