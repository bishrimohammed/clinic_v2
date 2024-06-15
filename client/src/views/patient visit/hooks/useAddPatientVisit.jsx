import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddPatientVisit = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  // console.log(headers);
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/patientvisits`, data, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "UpcomingPatientVisit",
          { stage: "", status: "", vistiType: "" },
        ],
      });
      toast.success("Patient visits successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
