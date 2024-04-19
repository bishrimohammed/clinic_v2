import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useActivateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (serviceId) => {
      return await Axiosinstance.patch(`/service/${serviceId}/activate`);
    },
    onSuccess: (data) => {
      //   console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["clinic-services"],
      });
      toast.success("Service activated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
};
