import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddProcedure = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(
        `/procedures/${data.medicalRecordId}`,
        { procedures: data.procedures },
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      console.log(variables);
      toast.success("Procedures addede successfully");
      queryClient.invalidateQueries({
        queryKey: ["Medical Record", variables.medicalRecordId, "procedure"],
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Some thing went wrong");
    },
  });
};
