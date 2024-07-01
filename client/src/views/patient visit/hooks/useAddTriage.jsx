import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
export const useAddTriage = () => {
  const { headers } = AxiosHeaders();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      // const vitals = data.vitals;
      return await Axiosinstance.post(
        `/medicalrecords/${state.medicalRecord_id}/addTriage`,
        data,
        { headers }
      );
    },
    onSuccess: () => {
      // console.log("success");
      queryClient.invalidateQueries({
        queryKey: [
          "UpcomingPatientVisit",
          { stage: "", status: "", vistiType: "" },
        ],
      });
      toast.success("Triage added successfully");
    },
  });
};
