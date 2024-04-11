// useVisitType custom hooks that  use useQuery

import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

export const useGetVisitType = () => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["visitType"],
    queryFn: async () => {
      return Axiosinstance.get("/visittype", {}, { ...header }).then(
        (res) => res.data
      );
    },
    staleTime: 60 * 60 * 1000,
  });
};
