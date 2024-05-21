import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useLocation } from "react-router-dom";

export const useTakePayment = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/payments/take-payment`, data, {
        headers,
      });
    },
    onSuccess: () => {
      toast.success("Take payment successfully");
      queryClient.invalidateQueries({
        queryKey: ["OutStanding payments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["MedicalBillPayment", state.id, { status: "" }],
      });
    },
  });
};
