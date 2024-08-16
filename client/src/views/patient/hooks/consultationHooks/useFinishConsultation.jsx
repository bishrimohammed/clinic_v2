import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useFinishConsultation = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.patch(
        `medicalrecords/${data.medicalRecordId}/finish-consultation`,
        data.formData,
        { headers }
      );
    },
    onSuccess: async (data, variables) => {
      //   const { data: resData } = data;

      queryClient.invalidateQueries({
        queryKey: [
          "UpcomingAssignedVisitToDoctor",
          {
            stage: "",
            status: "",
            vistiType: "",
          },
        ],
      });
      toast.success("Consultation is completed successfully ");
    },
    // onError: (error) => {
    //   // handle error
    //   console.log("on error");
    //   console.log(error);
    //   toast.error(error?.response?.data?.message);
    // },
  });
};
