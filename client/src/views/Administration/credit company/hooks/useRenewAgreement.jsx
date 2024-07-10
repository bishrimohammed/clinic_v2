import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useRenewAgreement = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/creditcompany/agreement`, data, {
        headers,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agreements", state.id],
      });
      toast.success("Agreement renewed successfully");
    },
    onError: () => {
      toast.error("Error renewing agreement");
    },
  });
};
