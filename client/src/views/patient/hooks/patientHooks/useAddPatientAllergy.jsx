import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useAddPatientAllergy = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      console.log(data);
      return Axiosinstance.post(
        `/patient/${data.patientId}/allergy`,
        data.newAllergy,
        {
          headers,
        }
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Patient allergy added successfully");
      queryClient.invalidateQueries({
        queryKey: ["patient general info", variables.patientId],
        exact: true,
      });
    },
  });
};
