import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddLabResult = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();

  return useMutation({
    mutationFn: async ({ data, labId }) => {
      return Axiosinstance.post(
        `medicalrecords/${labId}/addInvestigationResult`,
        data,
        { ...header }
      );
    },
    onSuccess: async (data) => {
      const { data: resData } = data;

      // console.log(resData.medicalId._id);
      queryClient.invalidateQueries({
        queryKey: [
          "MedicalHistory",
          resData.medicalId,
          "Ordered Lab Investigations",
        ],
        exact: true,
      });
      toast.success("investigations successfully submited");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
