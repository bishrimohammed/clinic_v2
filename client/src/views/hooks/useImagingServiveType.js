import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";

export function useImagingServiveType() {
  return useQuery({
    queryKey: ["Imaging Package Service"],
    queryFn: async () =>
      Axiosinstance.get("/service/imagingcategory").then((res) => res.data),
  });
}
