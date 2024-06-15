import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useSaveForLater = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/appointment/saveforlater`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointment", "saveforlater"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointment", "saveforlater"],
      });
    },
    throwOnError: true,
    retry: 3,
    retryDelay: 1000,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointment", "saveforlater"],
      });
    },
  });
};
