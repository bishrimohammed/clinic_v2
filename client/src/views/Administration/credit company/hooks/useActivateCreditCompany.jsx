import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useActivateCreditCompany = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (companyId) => {
      return await Axiosinstance.patch(
        `/creditcompany/${companyId}/activate`,
        {},
        { headers }
      );
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
