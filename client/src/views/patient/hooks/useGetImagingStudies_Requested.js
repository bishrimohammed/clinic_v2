import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useGetImagingStudies_Requested() {
  return useQuery({
    queryKey: ["ImagingStudies_Requested"],
    queryFn: async () =>
      Axiosinstance.get(`/lab/pending/imaging`).then((res) => res.data),

    staleTime: 5 * 60 * 1000,
  });
}
