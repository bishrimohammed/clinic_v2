import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const useActivateUser = () => {
  const header = AxiosHeaders();
  const { userId } = useParams();
  //console.log(userId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      //console.log(userData);
      return Axiosinstance.patch(
        `/user/${id}/activate`,
        {},
        {
          ...header,
        }
      );
    },
    onSuccess: async (response, variables) => {
      const { data } = response;
      // console.log(data);
      toast.success("user activated");
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
      // console.log(variables);
    },
    onError: async (error) => {
      const { message } = error;
      const { data } = error.response;
      toast.error(data.message);
      console.log(data.message);
    },
  });
};
