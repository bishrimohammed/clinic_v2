import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../../../api/axiosInstance";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import { toast } from "react-toastify";

export const useEditCompanyEmployee = () => {
  const queryClient = useQueryClient();
  const { headers } = AxiosHeaders();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/creditcompany/employee/${data.employeeId}`,
        data.formData,
        { headers }
      );
    },
    onSuccess: (data, variables) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["CompanyEmployees", parseInt(data?.data?.company_id)],
        exact: true,
      });
      toast.success("Employee updated successfully");
    },
    onError: async (err) => {
      console.log(err.response);
    },
  });
};
