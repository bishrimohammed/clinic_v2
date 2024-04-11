import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useAddImagingOrder = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  // console.log(header);
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/lab/orderImageinvestigation", data, {
        ...header,
      });
    },
    onSuccess: async (data, variables) => {
      const { data: resData } = data;

      //console.log(resData.medicalId._id);
      queryClient.invalidateQueries({
        queryKey: [
          "MedicalHistory",
          resData.medicalId,
          "Ordered Imageing for history",
        ],
        exact: true,
      });
      toast.success("investigations successfully submitted");
    },
    onError: (error) => {
      // handle error
      console.log("on error");
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};
