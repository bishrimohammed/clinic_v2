import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../api/axiosInstance";

export const useGetVitalSignFields = () => {
  return useQuery({
    queryKey: ["vital_sign_fields"],
    queryFn: async () => {
      return Axiosinstance.get("/fields/vitalsignFields").then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
