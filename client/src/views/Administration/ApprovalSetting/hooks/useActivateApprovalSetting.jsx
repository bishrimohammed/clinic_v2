import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useActivateApprovalSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`/approval-settings/${id}/activate`);
    },
    onSuccess: () => {
      toast.success("Approval Setting Activated");
      queryClient.invalidateQueries({
        queryKey: ["approval settings"],
      });
    },
  });
};
