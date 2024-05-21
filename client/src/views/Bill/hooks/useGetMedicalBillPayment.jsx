import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetMedicalBillPayment = (query) => {
  // console.log(query);
  return useQuery({
    queryKey: ["MedicalBillPayment", query.id, query.filter],
    queryFn: async () => {
      return await Axiosinstance.get(`/payments/${query.id}/payments`, {
        params: query.filter,
      }).then((res) => res.data);
    },
    staleTime: 30 * 60 * 1000,
    // enabled: search!== "",
  });
};
