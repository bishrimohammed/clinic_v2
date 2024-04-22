import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useEnableVitalSign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(`/fields/vitalsignField/${id}/enable`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vital_sign_fields"],
        exact: true,
      });
      toast.success("Vital sign Field enabled Successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });
};
