import { AxiosHeaders } from "../api/useAxiosHeaders";
import Axiosinstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardPatientVisit = () => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["dadhboard data", "patient visit"],
    queryFn: async () =>
      Axiosinstance.get("/dashboard/patient-visit", { headers }).then(
        (res) => res.data
      ),
    //   refetchOnWindowFocus: true,
    // staleTime: 20 * 60 * 1000,
  });
};
