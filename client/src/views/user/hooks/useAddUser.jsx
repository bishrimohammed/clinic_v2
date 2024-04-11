import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userData) => {
      // console.log(userData);
      return Axiosinstance.post("/user", userData, {
        ...header,
      });
    },
    onSuccess: async (response) => {
      const { data } = response;
      // console.log(data);
      toast.success("User account added successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
      // <Navigate to="administrations/user/userlist" />;
      navigate(-1);
      // console.log(variables);
    },
    // onError: async (error) => {
    //   const { message } = error;
    //   const { data } = error.response;
    //   // toast.error(data.message);
    //   // console.log(data.message);
    // },
  });
};
