import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import Axiosinstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const useReturnRemainingAmount = () => {
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (medicalBillingId) => {
      return Axiosinstance.patch(
        `/payments/${medicalBillingId}/return-remaining-amount`,
        //   data.formData,{}
        {},
        {
          headers,
        }
      );
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [
          "OutStanding payments",
          {
            visit_date: "",
            visit_type: "",
            stage: "",
          },
        ],
      });
      navigate("/payments");
    },
  });
};
