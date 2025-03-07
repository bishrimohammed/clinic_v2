import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useFinishTraige = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/patientvisits/${id}/finish-traige`,
        {},
        { headers }
      );
    },
    onSuccess: () => {
      toast.success("Visit traige  finished successfully");
      queryClient.invalidateQueries({
        queryKey: [
          "UpcomingPatientVisit",
          { stage: "", status: "", vistiType: "" },
        ],
      });
    },
    onError: (err) => {
      toast.error("Error finishing appointment");
      console.log(err);
    },
  });
};
