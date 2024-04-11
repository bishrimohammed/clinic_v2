import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddImagingResult = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();

  return useMutation({
    mutationFn: async ({ Data, testId }) => {
      return Axiosinstance.post(`lab/${testId}/addimagingresult`, Data, {
        ...header,
      });
    },
    onSuccess: async (data) => {
      const { data: resData } = data;
      toast.success("investigations successfully submited");

      queryClient.invalidateQueries({
        queryKey: ["MedicalHistory", "imaging studies", resData.medicalId],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
