import Axiosinstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "../api/useAxiosHeaders";

export const useGetDashboardDataDoctorWorkingHour = () => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: ["dadhboard data", "doctor working hour"],
    queryFn: async () =>
      Axiosinstance.get("/dashboard/doctor-work-hour", { headers }).then(
        (res) => res.data
      ),
    //   refetchOnWindowFocus: true,
    // staleTime: 20 * 60 * 1000,
  });
};
