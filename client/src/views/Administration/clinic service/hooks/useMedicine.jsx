import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddMedicine = () => {
  const header = AxiosHeaders();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(`/medication`, data, {
        ...header,
      });
    },
    onSuccess: async (data) => {
      console.log(data);
      toast.success("successfully added", {});
      queryClient.invalidateQueries({
        queryKey: ["medicine list"],
        exact: true,
      });
      navigate("/administrations/services");
    },
    onError: async (err) => {
      toast.error(err.response.data.message);
    },
  });
};

export const useUpdateMedicine = () => {
  const header = AxiosHeaders();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { medicineId } = useParams();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(`/medication/${medicineId}`, data, {
        ...header,
      });
    },
    onSuccess: async (data) => {
      // console.log(data);
      toast.success("successfully Updated", {});
      navigate("/administrations/services");
      queryClient.invalidateQueries({
        queryKey: ["medicine list"],
        exact: true,
      });
      //navigate("/administrations/services");
    },
    onError: async (err) => {
      toast.error(err.response.data.message);
    },
  });
};
