import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../../api/axiosInstance";
import { useLocation } from "react-router-dom";

export const useActivateServiceItem = () => {
  const { state } = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (serviceId) => {
      return await Axiosinstance.patch(
        `/service/${serviceId}/activate/serviceitem`
      );
    },
    onSuccess: (data) => {
      //   console.log(data);
      //   console.log(ll);
      queryClient.invalidateQueries({
        queryKey: ["service-items", state.id, { groups: [], status: "" }],
      });
      toast.success("Service Item activated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
};
