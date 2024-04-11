import { useQuery } from "@tanstack/react-query";

import Axiosinstance from "../../../api/axiosInstance";

export const useGetBillReport = (startdate, end_date) => {
  return useQuery({
    queryKey: ["bills", "report"],
    queryFn: async () =>
      Axiosinstance.get(
        `/report/bill?start_date=${startdate}&end_date=${end_date}`
      ).then((res) => res.data),
  });
};
