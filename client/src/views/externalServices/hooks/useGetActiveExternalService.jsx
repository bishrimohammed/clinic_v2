import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
export const useGetActiveExternalService = (query) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Active extrenal service"],
    queryFn: async () => {
      return await Axiosinstance.get("/externalservices/active", {
        params: query,
        headers,
      }).then((res) => res.data);
    },
    staleTime: 10 * 60 * 1000,
  });
};
