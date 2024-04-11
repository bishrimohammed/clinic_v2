import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useChangePassword = () => {
  //AxiosHeaders

  const header = AxiosHeaders();
  //console.log(headers);
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put("/user/changepassword", data, { ...header });
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);
      toast.success(data.message);
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message);
    },
  });
};
