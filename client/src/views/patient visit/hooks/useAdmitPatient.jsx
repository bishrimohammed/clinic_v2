import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAdmitPatient = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (visitId) => {
      return await Axiosinstance.patch(
        `/patientvisits/${visitId}/admit`,
        {},
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["UpcomingAssignedVisitToDoctor"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Patient Visit", variables.visitId],
      });
      toast.success(`Patient Admitted successfully`);
    },
  });
};
