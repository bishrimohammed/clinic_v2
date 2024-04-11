import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      //   console.log(data);

      return Axiosinstance.put(`/role/${data.roleId}`, data.role);
    },
    onSuccess: async (data) => {
      // console.log(data.data);
      queryClient.invalidateQueries({
        queryKey: ["Roles", { status: "" }],
        // exact: true,
      });
      toast.success("Role updated successfully");
      navigate(-1);
    },
    onError: async (err) => {
      toast.error(err.response.data.message);
    },
  });
};
