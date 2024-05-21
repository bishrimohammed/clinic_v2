import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../../api/axiosInstance";

export const useGetPatientGeneralInfo = (id) => {
  return useQuery({
    queryKey: ["patient general info", id],
    queryFn: async () => {
      return await Axiosinstance.get(`/patient/${id}/general-info`)
        .then((response) => response.data)
        .catch((error) => {
          console.log(err);
        });
    },
    staleTime: 30 * 60 * 1000,
  });
};
