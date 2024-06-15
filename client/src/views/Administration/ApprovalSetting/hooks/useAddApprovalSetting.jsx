import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useAddApprovalSetting = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/approval-settings`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["approval-setting"],
      });
      toast.success("Approval Settings added successfully");
    },
    // onError: (err) => {
    //   console.log(err);
    // },
  });
};
