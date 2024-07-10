import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useTerminateAgreement = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/creditcompany/agreement/${id}/terminate`,
        { headers }
      );
    },
    onSuccess: () => {
      toast.success("Agreement terminated successfully");
      queryClient.invalidateQueries({
        queryKey: ["agreements", state.id],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
