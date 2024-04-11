import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../../api/useAxiosHeaders";

export const useGetInternalPrescription = (historyId) => {
  let header = AxiosHeaders();

  return useQuery({
    queryKey: ["MedicalHistory", historyId, "InternalPrescription"],
    queryFn: async () =>
      Axiosinstance.get(`/prescriptions/${historyId}`, { ...header }).then(
        (res) => res.data
      ),
    staleTime: 20 * 60 * 1000,
  });
};
