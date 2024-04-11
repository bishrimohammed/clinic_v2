import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddPrograssNote = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  //console.log(header);
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/patienthistory/progressnote", data, {
        ...header,
      });
    },
    onSuccess: async (data, variables) => {
      toast.success("submitted successfully");
      console.log(variables);
      queryClient.invalidateQueries({
        queryKey: ["MedicalHistory", variables.historyId, "ProgressNote"],
        exact: true,
      });
    },
    onError: async (err) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });
};
