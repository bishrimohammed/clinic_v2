import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../api/axiosInstance";

export default function useLaboratoryTests() {
  const { data, error, isFetched } = useQuery({
    queryKey: ["laboratoryTests", 1],
    queryFn: async () =>
      Axiosinstance.get(`/service/labtest`).then((res) => res.data),
    staleTime: 60 * 24 * 60 * 1000,
  });
  if (isFetched) {
    const options = data.map((test) => {
      return {
        // _id: test._id,
        // test_name: test.test_name,
        lab_category: test.lab_category,
        value: test._id,
        label: test.test_name,
      };
    });
    return options;
  }
}

/* laboratory pricing */
export function useLaboratoryTestPricing() {
  return useQuery({
    queryKey: ["laboratoryTests", "pricing"],
    queryFn: async () =>
      Axiosinstance.get("/service/labtest").then((res) => res.data),
    staleTime: 60 * 24 * 60 * 1000,
  });
}
