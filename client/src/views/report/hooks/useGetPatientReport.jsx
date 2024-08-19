import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetPatientReport = (
  { report_type, report_target },
  triggerFetch,
  setTriggerFetch
) => {
  return useQuery({
    queryKey: ["patient report", report_type, report_target],
    queryFn: async () => {
      return await Axiosinstance.get(
        "/reports/patient",
        { params: { report_type, report_target } },
        {}
      ).then((res) => {
        setTriggerFetch(false);
        return res.data;
      });
    },
    onSuccess: () => {
      setTriggerFetch(false); // Reset `triggerFetch` on success
    },
    onError: () => {
      setTriggerFetch(false); // Reset `triggerFetch` on error
    },
    // enabled: query
    staleTime: 20 * 60 * 1000,
    enabled: triggerFetch && !!report_type && !!report_target,
    // select:
  });
};
