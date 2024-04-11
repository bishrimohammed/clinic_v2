import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function usePatients() {
  //const { data, error, isLoading, isError, isSuccess } =
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      return Axiosinstance.get("/patient").then((res) => res.data);
    },
    staleTime: 10 * 60 * 1000,
  });
}
export const useFilterPatient = (search) => {
  const { data, isPending } = usePatient();

  //if (isPending) return "loading...";
  console.log(data);
  if (data) {
    return data.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.cardNumber === search ||
        patient.phone.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
};
