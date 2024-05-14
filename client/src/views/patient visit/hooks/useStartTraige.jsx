import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useStartTraige = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`/patientvisits/${id}/start-traige`);
    },
    onSuccess: () => {
      toast.success("Visit traige  started successfully");
      queryClient.invalidateQueries({
        queryKey: [
          "UpcomingPatientVisit",
          { stage: "", status: "", vistiType: "" },
        ],
      });
    },
    onError: (err) => {
      toast.error("Error starting appointment");
    },
  });
};
