import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/employee", data);
    },
    onSuccess: async (data) => {
      toast.success("Employee added successfully");
      queryClient.invalidateQueries({
        queryKey: ["Employees"],
        exact: true,
      });
    },
    // onError: async (error) => {
    //   // toast.error(error.response.data.message);
    // },
  });
};
