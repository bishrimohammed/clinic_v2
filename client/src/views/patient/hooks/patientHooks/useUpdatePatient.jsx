import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/patient/${data.patientId}`,
        data.formData,
        { headers }
      ).then((res) => res.data);
    },
    onSuccess: async (data, variables) => {
      // const { data, } = response;
      //console.log(data);
      queryClient.invalidateQueries({
        queryKey: [
          "Patients",
          { is_new: "", is_credit: "", gender: "", status: "" },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["Patient", variables.patientId],
        exact: true,
      });
      toast.success("Patient updated successfully");
      navigate("/patients");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message);
    },
  });
};
