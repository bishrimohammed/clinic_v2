import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetLabCategory = () => {
  return useQuery({
    queryKey: ["LabCategory"],
    queryFn: async () => {
      return await Axiosinstance.get("service/getLabServiceCategories").then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000,
    // enabled: search!== "",
  });
};
