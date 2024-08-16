import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useFinishProgressNote = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(
        `/progressnotes/${data.medicalRecord_id}/finish`,
        data.formData,
        { headers }
      );
    },
    onSuccess: async (response, variable) => {
      console.log(response);
      toast.success("Patient Discharged successfully ");
    },
    onError: async (error) => {
      console.error(error);
    },
  });
};
