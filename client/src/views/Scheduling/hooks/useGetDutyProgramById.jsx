import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetDutyProgramById = (id) => {
  return useQuery({
    queryKey: ["DutyProgram", id],
    queryFn: async () => {
      return await Axiosinstance.get(`dutyprogram/${id}`).then(
        (res) => res.data
      );
    },
    staleTime: 20 * 60 * 1000,
    // enabled: search!== "",
  });
};
