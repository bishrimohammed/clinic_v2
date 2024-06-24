import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useGetSavedForLaterProgressNote = (medicalRecord_id) => {
  const { headers } = AxiosHeaders();
  return useQuery({
    queryKey: [
      "Medical Record",
      medicalRecord_id,
      "Saved for later Progress Note",
    ],
    queryFn: async () => {
      return await Axiosinstance.get(
        `/temporarydata/${medicalRecord_id}/progressnote`,
        { headers }
      ).then((response) => response.data);
    },
    staleTime: 30 * 60 * 1000,
  });
};
