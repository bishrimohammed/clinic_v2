import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetProgressNoteDetail = (progressNoteId) => {
  return useQuery({
    queryKey: ["Progress Note", progressNoteId],
    queryFn: async () => {
      return await Axiosinstance.get(`/progressnotes/${progressNoteId}/lab`);
    },
    refetchInterval: 20 * 60 * 1000,
  });
};
