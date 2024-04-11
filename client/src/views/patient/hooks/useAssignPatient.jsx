import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { toast } from "react-toastify";
export const useAssignPatient = () => {
  const header = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return await Axiosinstance.post("/assignpatient", data, { ...header });
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);
      toast.success("Assigned succeessfully");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message);
    },
  });
};
