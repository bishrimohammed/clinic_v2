import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useVoidPayment = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`/payments/${id}/void`, {}, { headers });
    },
    onSuccess: (data, variables) => {
      toast.success("Payment voided successfully");
      queryClient.invalidateQueries({
        queryKey: ["MedicalBillPayment", variables, { status: "" }],
        exact: true,
      });
    },
    onError: () => {
      toast.error("Payment could not be voided");
    },
    onSettled: () => {
      queryClient.invalidateQueries("payments");
    },
  });
};
