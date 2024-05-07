import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetCompanyEmployees = (id) => {
  return useQuery({
    queryKey: ["CompanyEmployees", id],
    queryFn: async () => {
      // console.log("fetched");
      return await Axiosinstance.get(`/creditcompany/${id}/employees`).then(
        (res) => res.data
      );
    },
    staleTime: 20 * 60 * 1000,
  });
};
