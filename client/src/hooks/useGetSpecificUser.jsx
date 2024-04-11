import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../api/axiosInstance";
import { AxiosHeaders } from "../api/useAxiosHeaders";

export const useGetSpecificUser = (userType) => {
  const header = AxiosHeaders();
  console.log(header);
  return useQuery({
    queryKey: ["users", userType],
    queryFn: async () =>
      Axiosinstance.get(`/user/search?query=${userType}`, { ...header }).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
