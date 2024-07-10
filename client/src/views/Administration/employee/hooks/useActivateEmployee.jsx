import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useActivateEmployee = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();

  return useMutation({
    mutationFn: async (id) =>
      Axiosinstance.patch(`/employee/${id}/activate`, {}, { headers }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Employees"],
        exact: false,
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
