import React from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { AxiosHeaders } from "../../../api/useAxiosHeaders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//import Axiosinstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";
import Axiosinstance from "../../../../api/axiosInstance";

export const useGetImagingStudies = () => {
  const header = AxiosHeaders();
  return useQuery({
    queryKey: ["ImagingStudies"],
    queryFn: async () => {
      return Axiosinstance.get("/service/getImagingServiceItems", {
        ...header,
      }).then((res) => res.data);
    },
  });
};

export const useAddImagingService = () => {
  const navigate = useNavigate();
  const header = AxiosHeaders();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post(`/service/createImagingService`, data, {
        ...header,
      });
    },
    onSuccess: async () => {
      toast.success("Added succeessfully");
      queryClient.invalidateQueries({
        queryKey: ["ImagingStudies"],
        exact: true,
      });
      navigate("/administrations/services");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message, {});
    },
  });
};

export const useUpdateImagingService = () => {
  const { imagingId } = useParams();
  const header = AxiosHeaders();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(
        `/service/${imagingId}/updateimagingService`,
        data,
        {
          ...header,
        }
      );
    },
    onSuccess: async () => {
      toast.success("successfully updated", {});
      navigate("/administrations/services");
      queryClient.invalidateQueries({
        queryKey: ["ImagingStudies"],
        exact: true,
      });
      //navigate("/administrations/services");
    },
    onError: async (err) => {
      toast.error(err.response.data.message);
    },
  });
};
