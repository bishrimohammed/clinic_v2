import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetLabServices = () => {
  return useQuery({
    queryKey: ["lab services"],
    queryFn: async () =>
      await Axiosinstance.get(`/service/getLabServiceItems`).then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
