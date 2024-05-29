import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddLabResult = () => {
  const { state } = useLocation();
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `/investigation/${state.id}/add-lab-result`,
        data,
        {
          headers,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["OrderedTests", state.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["lab Requested"],
      });
      toast.success("Lab result added successfully");
    },
    onError: (err) => {
      toast.error("Lab result could not be added");
      console.log(err);
    },
  });
};
