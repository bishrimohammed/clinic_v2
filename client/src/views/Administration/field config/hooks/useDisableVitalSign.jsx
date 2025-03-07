import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useDisableVitalSign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(`/fields/vitalsignField/${id}/disable`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vital_sign_fields"],
        exact: true,
      });
      toast.success("Vital sign Field disabled successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
};
