import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useApprove = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/approvalrequests/${id}/approve`,
        {},
        { headers }
      );
    },
    onSuccess: (response, variables) => {
      // console.log("Request approved successfully", response);
      console.log(response);
      queryClient.invalidateQueries({
        queryKey: ["Pending Approval Request"],
      });
      toast.success(response.data);
    },
    onError: (error) => {
      console.error(error);
      toast.error(err.response.data.message);
    },
    // Retry on 409 (Conflict)
  });
};
