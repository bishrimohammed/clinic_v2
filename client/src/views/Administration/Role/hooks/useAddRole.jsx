import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAddRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    queryKey: "addRole",
    mutationFn: async (data) => {
      return Axiosinstance.post("/role", data);
    },
    onSuccess: (data) => {
      // console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["Roles", { status: "" }],
        // exact: true,
      });
      toast.success("Role added successfully");
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.data);
    },
  });
};
