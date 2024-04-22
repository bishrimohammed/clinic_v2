import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";

export const useActivateCreditCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (companyId) => {
      return await Axiosinstance.patch(`/creditcompany/${companyId}/activate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credit Companies", { status: "" }],
      });
      toast.success("Credit company activated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
