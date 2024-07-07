import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useStartTraige = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/patientvisits/${id}/start-traige`,
        {},
        { headers }
      );
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
      toast.error(err.response.data.message);
    },
  });
};
