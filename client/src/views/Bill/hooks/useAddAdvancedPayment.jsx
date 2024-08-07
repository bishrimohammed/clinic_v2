import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAddAdvancedPayment = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `/payments/${data.billId}/add-advanced-payment`,
        data.formData,
        {
          headers,
        }
      );
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["Medical Billing", variables.billId],
      });
    },
  });
};
