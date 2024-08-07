import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useSettlePayments = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (medicalBillingId) => {
      return await Axiosinstance.patch(
        `/payments/${medicalBillingId}/settlepayments`,
        {},
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      //   console.log(variables);
      queryClient.invalidateQueries({
        queryKey: ["Medical Billing", variables],
      });
      queryClient.invalidateQueries({
        queryKey: ["MedicalBillPayment", variables, { status: "" }],
      });
      toast.success("Payments settled successfully");
    },
    onError: (err) => {
      console.log("Error settling payments");
    },
  });
};
