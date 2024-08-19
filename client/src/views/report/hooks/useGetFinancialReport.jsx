import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetFinancialReport = (
  { report_type, start_date, end_date },
  triggerFetch,
  setTriggerFetch
) => {
  return useQuery({
    queryKey: ["financialReport", report_type, start_date, end_date],
    queryFn: async () => {
      return await Axiosinstance.get(
        "/reports/financial",
        { params: { report_type, start_date, end_date } },
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
    enabled: triggerFetch && !!report_type,
    // select:
  });
};
