import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useGetImagingStudies() {
  const { data, isPending, isFetched, error } = useQuery({
    queryKey: ["ImagingStudies"],
    queryFn: async () =>
      Axiosinstance.get(`/service/imagetest`).then((res) => res.data),
    staleTime: 60 * 24 * 60 * 1000,
  });
  if (isFetched) {
    console.log(data);
    const options = data.map((test) => {
      return {
        _id: test._id,
        test_name: test.test_name,
        imaging_category: test.imaging_category,
        value: test._id,
        label: test.test_name,
      };
    });

    return options;
  }
}

export function useGetImagingStudiesTests() {
  return useQuery({
    queryKey: ["Imaging Studies tests"],
    queryFn: async () =>
      Axiosinstance.get(`/service/imagetest`).then((res) => res.data),
    staleTime: 60 * 24 * 60 * 1000,
  });
}
