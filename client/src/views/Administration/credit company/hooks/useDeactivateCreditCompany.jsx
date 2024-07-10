import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useDeactivateCreditCompany = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (companyId) => {
      return await Axiosinstance.patch(
        `/creditcompany/${companyId}/deactivate`,
        { headers },
        {}
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credit Companies", { status: "" }],
      });
      toast.success("Credit company deactivated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
