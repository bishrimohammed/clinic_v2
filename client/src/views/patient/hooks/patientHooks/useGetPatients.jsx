import Axiosinstance from "../../../../api/axiosInstance";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const fetchPatients = async (query) => {
  // console.log(query);
  return await Axiosinstance.get(`/patient`, {
    params: query,
  })
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const useGetPatients = (query) => {
  const queryClient = useQueryClient();
  // console.log(!!query.page);
  return useQuery({
    queryKey: ["Patients", query],
    // queryFn: async () => {
    //   return Axiosinstance.get(`/patient`, {
    //     params: query,
    //   })
    //     .then((res) => res.data)
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    queryFn: () => fetchPatients(query),
    initialData: () => {
      // return {
      //   // patients: [],
      //   totalPages: 1,
      //   currentPage: 1,
      // };
    },

    // make stale time 20 minutes
    // staleTime: 20 * 60 * 1000,
    // enabled:!!query.page,
    placeholderData: keepPreviousData,
    // placeholderData: () => {
    //   // Use the smaller/preview version of the blogPost from the 'blogPosts'
    //   // query as the placeholder data for this blogPost query
    //   console.log(queryClient.getQueryData(["Patients", query]));
    //   // return queryClient
    //   //   .getQueryData(['Patients'])
    //   //   ?.find((d) => d.id === blogPostId)
    // },
    staleTime: 20 * 60 * 1000,
    enabled: !!query.page,
  });
};
