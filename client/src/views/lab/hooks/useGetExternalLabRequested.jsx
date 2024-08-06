import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetExternalLabRequested = () => {
  return useQuery({
    queryKey: ["ExternalLabRequested"],
    queryFn: async () => {
      return await Axiosinstance.get(
        "/investigation/pending-external-lab"
      ).then((res) => res.data);
    },
    staleTime: 5 * 60 * 60 * 1000, // 5 hours
  });
};
