import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useActivatePatient = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(
        `/patient/${id}/activate`,
        {},
        { headers }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "Patients",
          { is_new: "", is_credit: "", gender: "", status: "" },
        ],
      });
      toast.success("Patient activated successfully");
    },
    // staleTime: 20 * 60 * 1000,
    // enabled: search !== "",
  });
};
