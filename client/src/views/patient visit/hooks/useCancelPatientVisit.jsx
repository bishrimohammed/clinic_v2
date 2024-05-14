import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useCancelPatientVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`/patientvisits/${id}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient visits", { stage: "", status: "", vistiType: "" }],
      });
      toast.success(`Patient visits Cancelled successfully`);
    },
  });
};
