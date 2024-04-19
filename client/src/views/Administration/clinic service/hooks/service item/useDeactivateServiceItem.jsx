import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../../api/axiosInstance";
import { useLocation } from "react-router-dom";

export const useDeactivateServiceItem = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  console.log(state);
  return useMutation({
    mutationFn: async (serviceId) => {
      return await Axiosinstance.patch(
        `/service/${serviceId}/deactive/serviceitem`
      );
    },
    onSuccess: async (data, variables) => {
      //   console.log(data);
      //   const serviceId = data.config.url.split("/")[2];
      //   console.log(serviceId);
      console.log(data);
      console.log(variables);
      //   console.log(ll);
      queryClient.invalidateQueries({
        queryKey: ["service-items", state.id, { groups: [], status: "" }],
      });
      toast.success("Service Item deactivated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
};
