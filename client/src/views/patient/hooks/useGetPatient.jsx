import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useGetPatient(patientId) {
  //const { data, error, isLoading, isError, isSuccess } =
  return useQuery({
    queryKey: ["patient overviewdata", patientId],
    queryFn: async () => {
      return Axiosinstance.get(`/patient/${patientId}/overviewdata`).then(
        (res) => res.data
      );
    },
    staleTime: 30 * 60 * 1000,
  });
}
