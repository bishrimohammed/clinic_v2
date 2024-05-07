import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      return Axiosinstance.get("/user/doctors").then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000,
  });
};
