import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useDeactivateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => Axiosinstance.patch(`/employee/${id}/deactivate`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Employees"],
        // exact: true,
      });
      // queryClient.refetchQueries({
      //   queryKey: ["Employees"],
      // });
      toast.success("Employee is deactivated successfully");
    },
    onError: async (error) => {
      toast.error(error.response.data.message);
    },
  });
};
