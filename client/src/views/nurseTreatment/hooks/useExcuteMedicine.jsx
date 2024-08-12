import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useExcuteMedicine = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (medicationId) => {
      return await Axiosinstance.patch(
        `/nursetreatments/${medicationId}/excute`,
        {},
        { headers }
      );
    },
    onSuccess: (response, variables) => {
      // Your success callback here
      const { data } = response;
      //   console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["prescriptions", data.prescription_id],
        // invalidate: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["prescriptions", data.prescription_id, "excuted"],
        // invalidate: false,
      });
    },
    onError: (error) => {
      // Your error callback here
    },
  });
};
