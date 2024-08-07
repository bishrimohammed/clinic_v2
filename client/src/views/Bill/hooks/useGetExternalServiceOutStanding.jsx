import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetExternalServiceOutStanding = () => {
  return useQuery({
    queryKey: ["externalServiceOutStanding"],
    queryFn: async () =>
      Axiosinstance.get(`/payments/externalservice/outstanding`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
