import { useMutation, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAddPatientVisit = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  console.log(headers);
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post(`/patientvisits`, data, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient visits"],
      });
    },
  });
};
