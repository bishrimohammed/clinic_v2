import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useSearchPatient = (query) => {
  return useQuery({
    queryKey: ["searchPatient", query],
    queryFn: async () => {
      return await Axiosinstance.get("/patient/search", { params: query }).then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000,
  });
};
