import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetPreviousAssignedVisitToDoctor = (query) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["PreviousAssignedVisitToDoctor", query],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientvisits/doctor/assigned`, {
        params: query,
        headers,
      }).then((res) => res.data);
    },
  });
};
