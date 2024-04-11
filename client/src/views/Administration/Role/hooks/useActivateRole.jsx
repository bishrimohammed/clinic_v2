import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useActivateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => Axiosinstance.patch(`/role/${id}/activate`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Roles", { status: "" }],
        exact: true,
      });

      toast.success("Role Activated successfully");
    },
    onError: async (error) => {
      toast.error(error.response.data.message);
    },
  });
};
