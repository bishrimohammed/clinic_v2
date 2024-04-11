import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useEditEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      // console.log(data.id);
      // return;
      return await Axiosinstance.put(`/employee/${data.id}`, data.formData);
    },
    onSuccess: (data) => {
      // console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["Employees", { gender: "", position: [], status: "" }],
        exact: true,
      });
      toast.success("Employee updated successfully");
    },
    onError: (error) => {
      // console.log(error);
      // toast.error(error.response.data.message);
    },
  });
};
