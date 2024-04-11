import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetEmplooyeDoesNotHaveAccount = () => {
  return useQuery({
    queryKey: ["useGetEmplooyeDoesNotHaveAccount"],
    queryFn: async () =>
      Axiosinstance.get(`/employee/nouser`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
