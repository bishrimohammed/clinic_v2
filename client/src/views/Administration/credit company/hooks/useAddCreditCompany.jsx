import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

export const useAddCreditCompany = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      // console.log(data);
      return Axiosinstance.post("/creditcompany", data, { headers });
    },
    onSuccess: async (response) => {
      const { data } = response;
      // console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["credit Companies", { status: "" }],
      });
      toast.success("Credit Company Added Successfully");
    },
    onError: async (err) => {
      // console.log(err.response);
      // toast.error(err.response.data.message, {});
    },
  });
};
