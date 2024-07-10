import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useApprove = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`./${id}/reject`, {}, { headers });
    },
    onSuccess: (data, variables) => {
      console.log("Request approved successfully", data);
    },
    onError: (error) => {
      console.error(error);
    },
    // Retry on 409 (Conflict)
  });
};
