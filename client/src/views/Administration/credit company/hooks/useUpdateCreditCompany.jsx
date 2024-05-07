import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useUpdateCreditCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      // console.log(data);
      return Axiosinstance.put(
        `/creditcompany/${data.companyId}`,
        data.formData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credit Companies", { status: "" }],
      });
      toast.success("Credit Company Updated Successfully");
    },
    onError: () => {
      toast.error("Error Updating Credit Company");
    },
  });
};
