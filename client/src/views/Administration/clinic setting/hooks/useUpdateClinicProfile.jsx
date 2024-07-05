import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
export const useUpdateClinicProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return await Axiosinstance.put(
        `/clinicprofile/${data.id}`,
        data.formData,
        { headers }
      ).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Clinic profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["Clinic Information"],
        exact: true,
      });
      // navigate(-1);
    },
    onError: (error) => {
      console.log();
      error;
      toast.error(error.response.data.message);
    },
  });
};
