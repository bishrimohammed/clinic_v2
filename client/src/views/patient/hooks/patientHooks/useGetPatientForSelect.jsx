import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";

export const useGetPatientForSelect = () => {
  return useQuery({
    queryKey: ["patient-for-select"],
    queryFn: async () => {
      return await Axiosinstance.get("/patient/select").then((res) => res.data);
    },
    // stale time 1 day\
    staleTime: 24 * 60 * 60 * 1000,
    // enabled: search !== "",

    // enabled: search !== "",
  });
};
