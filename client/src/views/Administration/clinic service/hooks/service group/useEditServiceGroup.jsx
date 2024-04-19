import React from "react";
import Axiosinstance from "../../../../../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const useEditServiceGroup = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/service/servicegroup/${data.serviceGroupId}`,
        data.serviceGroupData
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["ServiceGroups", state.id],
        exact: true,
      });
      //   toast.success("Service Group updated succeessfully");
    },
    onError: async (err) => {
      console.log(err.response);
      toast.error(err.response.data.message, {});
    },
  });
};
