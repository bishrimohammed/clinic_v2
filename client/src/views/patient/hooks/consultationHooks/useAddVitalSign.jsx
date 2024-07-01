import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useAddVitalSign = () => {
  const { headers } = AxiosHeaders();
  // const { state } = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      // Add your API call here
      // Example: return await axios.post('/api/vital-signs', data)
      return await Axiosinstance.post(
        `/medicalrecords/${data.medicalRecordId}/addVitalSign`,
        data.vitalData,
        { headers }
      );
    },
    onSuccess: (data, varabiles) => {
      // Handle successful API call
      toast.success("Vital sign added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Medical Record", varabiles.medicalRecordId, "Vital Signs"],
      });
    },
  });
};
