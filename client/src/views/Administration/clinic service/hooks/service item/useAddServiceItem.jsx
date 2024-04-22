import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
export const useAddServiceItem = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.post("/service/serviceitem", data);
    },
    onSuccess: async (data) => {
      //   const { data } = data;
      queryClient.invalidateQueries({
        queryKey: ["service-items", state.id, { groups: [], status: "" }],
      });
      toast.success("Service Item added succeessfully");
      // navigate(-1);
    },
    onError: async (err) => {
      // console.log(err.response)
      toast.error(err.response.data.message, {});
    },
  });
};
