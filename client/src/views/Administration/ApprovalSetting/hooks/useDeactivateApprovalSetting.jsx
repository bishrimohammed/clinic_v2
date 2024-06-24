import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useDeactivateApprovalSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`/approval-settings/${id}/deactivate`);
    },
    onSuccess: () => {
      toast.success("Deactivated");
      queryClient.invalidateQueries({
        queryKey: ["approval settings"],
      });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
