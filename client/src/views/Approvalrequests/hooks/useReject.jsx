import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useReject = () => {
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`./${id}/approve`);
    },
    onSuccess: (data, variables) => {
      console.log("Request rejected successfully", data);
    },
    onError: (error) => {
      console.error(error);
    },
    // Retry on 409 (Conflict)
  });
};
