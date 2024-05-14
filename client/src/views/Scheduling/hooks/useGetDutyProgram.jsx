import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetDutyProgram = () => {
  return useQuery({
    queryKey: ["DutyProgram"],
    queryFn: async () => {
      return await Axiosinstance.get("/dutyprogram").then((res) => res.data);
    },
  });
};
