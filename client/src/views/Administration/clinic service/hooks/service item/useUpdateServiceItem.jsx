import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";

export const useUpdateServiceItem = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.put(
        `/service/serviceitem/${data.serviceItemId}`,
        data.serviceItemData
      );
    },
    onSuccess: async (data) => {
      //   const { data } = data;
      queryClient.invalidateQueries({
        queryKey: ["service-items", state.id, { groups: [], status: "" }],
      });
      toast.success("Service Item updated succeessfully");
      //   navigate("/administrations/services/viewserviceitems");
    },
    onError: async (err) => {
      // console.log(err.response)
      toast.error(err.response.data.message, {});
    },
  });
};
