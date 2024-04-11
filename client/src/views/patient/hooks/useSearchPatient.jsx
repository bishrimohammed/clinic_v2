import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export const useSearchPatient = (search) => {
  //console.log(search);
  const query = search ? search : "";
  return useQuery({
    queryKey: ["searchPatient", query],
    queryFn: async () => {
      return Axiosinstance.get(`/patient/search?query=${query}`).then(
        (res) => res.data
      );
    },
    staleTime: 20 * 60 * 1000,
    // enabled: search !== "",
  });
};
