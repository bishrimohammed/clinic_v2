import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useCreateExternalService = () => {
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post("externalservices", data, { headers });
    },
    onSuccess: (response, variables) => {
      console.log(response);
      toast.success("External service created successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.response.data.message);
    },
  });
};
