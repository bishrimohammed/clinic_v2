import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddVitals = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();

  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("patienthistory/vitals", data, {
        ...header,
      });
    },
    onSuccess: async (resp) => {
      toast.success("submitted successfully");
      const { data } = resp;
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["MedicalHistory", data._id, "vitals"],
        exact: true,
      });
    },
    onError: async (err) => {
      toast.err(err.response.data.message);
    },
  });
};
