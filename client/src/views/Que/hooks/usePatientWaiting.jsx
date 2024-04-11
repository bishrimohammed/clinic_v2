import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetPatientWaitingList = () => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["PatientWaitingList"],
    queryFn: async () => {
      return Axiosinstance.get("/assignpatient", { ...header }).then(
        (res) => res.data
      );
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const usePatientCheckin = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(
        `/doctorque/${id}/checkin`,
        {},
        { ...header }
      ).then((res) => res.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["PatientWaitingList"]);
    },
  });
};

export const usePatientCheckout = () => {
  const queryClient = useQueryClient();
  const header = AxiosHeaders();
  // console.log(header);
  return useMutation({
    mutationFn: async (id) => {
      return Axiosinstance.patch(
        `/doctorque/${id}/checkout`,
        {},
        { ...header }
      ).then((res) => res.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["PatientWaitingList"]);
    },
  });
};
