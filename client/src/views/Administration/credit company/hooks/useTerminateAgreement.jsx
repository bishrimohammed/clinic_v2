import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const useTerminateAgreement = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/creditcompany/agreement/${id}/terminate`
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
