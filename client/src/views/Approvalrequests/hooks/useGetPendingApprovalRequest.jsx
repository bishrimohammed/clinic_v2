import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import Axiosinstance from "../../../api/axiosInstance";

export const useGetPendingApprovalRequest = () => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["Pending Approval Request"],
    queryFn: async () =>
      await Axiosinstance.get("/approvalrequests", { headers }).then(
        (response) => response.data
      ),
    staleTime: 30 * 60 * 1000,
  });
};
