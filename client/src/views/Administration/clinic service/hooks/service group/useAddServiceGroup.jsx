import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const useAddServiceGroup = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(
        `/service/servicegroup/`,
        data
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);
      //   toast.success("Service Group Added succeessfully");
      queryClient.invalidateQueries({
        queryKey: ["ServiceGroups", state.id],
        exact: true,
      });
    },
    onError: async (err) => {
      console.log(err.response);
      toast.error(err.response.data.message, {});
    },
  });
};
