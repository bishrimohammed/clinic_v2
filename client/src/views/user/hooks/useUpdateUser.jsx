import React from "react";
// import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Axiosinstance from "../../../api/axiosInstance";

export const useUpdateUser = () => {
  const header = AxiosHeaders();
  const { userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //console.log(userId);
  return useMutation({
    mutationFn: async (userData) => {
      // console.log(userData);
      // return;
      return Axiosinstance.put(`/user/${userData.userId}`, userData.user, {
        ...header,
      });
    },
    onSuccess: async (response, variables) => {
      const { data } = response;
      // console.log(data);
      toast.success("User account updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
      // console.log(?);
      // <Navigate to="administrations/user/userlist" />;
      navigate("administrations/user/userlist");
      // navigate(-1);
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
