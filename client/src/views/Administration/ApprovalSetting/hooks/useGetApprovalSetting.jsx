import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetApprovalSetting = (query) => {
  return useQuery({
    queryKey: ["approval settings", query],
    queryFn: async () => {
      return await Axiosinstance.get("/approval-settings", {
        params: query,
      }).then((res) => res.data);
    },
    staleTime: 60 * 60 * 1000,
  });
};
