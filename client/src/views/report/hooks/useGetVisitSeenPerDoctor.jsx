import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetVisitSeenPerDoctor = (
  { report_type },
  triggerFetch,
  setTriggerFetch
) => {
  return useQuery({
    queryKey: ["patient report", report_type],
    queryFn: async () => {
      return await Axiosinstance.get(
        "/reports/patient-seen-per-doctor",
        { params: { report_type } },
        {}
      ).then((res) => {
        setTriggerFetch(false);
        return res.data;
      });
    },

    // enabled: query
    staleTime: 20 * 60 * 1000,
    enabled: triggerFetch && !!report_type,
    // select:
  });
};
