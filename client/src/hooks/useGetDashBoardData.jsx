import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../api/axiosInstance";
import { AxiosHeaders } from "../api/useAxiosHeaders";

export const useGetDashBoardData = () => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["useImagingServiveType"],
    queryFn: async () =>
      Axiosinstance.get("/dashboard/", { ...header }).then((res) => res.data),
    staleTime: 20 * 60 * 1000,
  });
};
