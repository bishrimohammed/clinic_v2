import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/employee", data, { headers });
    },
    onSuccess: async (data) => {
      toast.success("Employee added successfully");
      queryClient.invalidateQueries({
        queryKey: ["Employees", { gender: "", position: [], status: "" }],
        // exact: true,
      });
    },
    // onError: async (error) => {
    //   // toast.error(error.response.data.message);
    // },
  });
};
