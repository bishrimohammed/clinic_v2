import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
//import Axiosinstance from "../../api/axiosInstance";

export const UseGetLabRequested = () => {
  return useQuery({
    queryKey: ["lab Requested"],
    queryFn: async () =>
      Axiosinstance.get(`/investigation/pending-lab`).then((res) => res.data),
    staleTime: 5 * 60 * 60 * 1000,
  });
};
