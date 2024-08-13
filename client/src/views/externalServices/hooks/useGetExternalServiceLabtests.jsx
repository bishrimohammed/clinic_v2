import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetExternalServiceLabtests = (externalServiceId) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["External service", externalServiceId, "lab"],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/externalservices/${externalServiceId}/lab`,
        {
          headers,
        }
      ).then((res) => res.data);
    },
    staleTime: 10 * 60 * 1000,
  });
};
