import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../api/axiosInstance";

export const useGetVisitType = () => {
  return useQuery({
    queryKey: ["visit Type"],
    queryFn: async () => {
      return await Axiosinstance.get("/visittype").then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
