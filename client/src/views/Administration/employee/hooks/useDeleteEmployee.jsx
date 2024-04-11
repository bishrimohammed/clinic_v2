import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => Axiosinstance.delete(`/employee/${id}`),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["Employees", { gender: "", position: [], status: "" }],
        exact: true,
      });
      // queryClient.refetchQueries({
      //   queryKey: ["Employees"],
      // });
      toast.success("Employee is deleted successfully");
    },
    onError: async (error) => {
      toast.error(error.response.data.message);
    },
  });
};
