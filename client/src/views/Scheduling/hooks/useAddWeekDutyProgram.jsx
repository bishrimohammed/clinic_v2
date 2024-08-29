import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddWeekDutyProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/dutyprogram`, data);
    },
    onSuccess: () => {
      toast.success("Week program added successfully");
      queryClient.invalidateQueries({
        queryKey: ["DutyProgram"],
      });
    },
  });
};
