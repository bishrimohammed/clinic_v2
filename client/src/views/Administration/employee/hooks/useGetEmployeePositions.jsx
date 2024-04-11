import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetEmployeePositions = () => {
  return useQuery({
    queryKey: ["EmployeePositions"],
    queryFn: async () => {
      return await Axiosinstance.get("/employee/positions").then(
        (res) => res.data
      );
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 day in ms
  });
};
