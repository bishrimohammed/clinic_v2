import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddWeekDutyProgram = () => {
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/dutyprogram`, data);
    },
    onSuccess: () => {
      toast.success("Week program added successfully");
    },
  });
};
