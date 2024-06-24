import { useMutation } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useFinishProgressNote = () => {
  return useMutation({
    mutationFn: async (id) => {
      return await Axiosinstance.patch(`/progressnotes/${id}/finish`);
    },
    onSuccess: () => {},
  });
};
