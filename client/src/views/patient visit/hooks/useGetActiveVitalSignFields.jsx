import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useGetActiveVitalSignFields = () => {
  return useQuery({
    queryKey: ["ActiveVitalSignFields"],
    queryFn: async () => {
      return await Axiosinstance.get("fields/vitalsignFields/active").then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000,
    // enabled: search!== "",
  });
};
