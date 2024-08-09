// import React from 'react'

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import Axiosinstance from "../../../../../api/axiosInstance";

export const useGetPatientLabs = (patientId) => {
  return useQuery({
    queryKey: ["Patient", patientId, "labs"],
    queryFn: async () => {
      return await Axiosinstance.get(`/patientoverview/${patientId}/labs`).then(
        (response) => response.data
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval: 1000 * 60 * 15 // 15 minutes
  });
};

// export const useGetPatientLabs = (patientId, limit = 3) => {
//   // console.log(limit);
//   return useInfiniteQuery({
//     queryKey: ["Patient", patientId, "labs"],
//     queryFn: async ({ pageParam }) => {
//       return await Axiosinstance.get(
//         `/patientoverview/${patientId}/labs?page=${pageParam}&limit=${limit}`
//       ).then((response) => response.data);
//     },
//     initialPageParam: 1,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     // refetchInterval: 1000 * 60 * 15 // 15 minutes
//     // ...options,

//     getNextPageParam: (lastPage, allPages) =>
//       lastPage.length ? allPages.length + 1 : undefined,
//     getPreviousPageParam: (
//       firstPage,
//       allPages,
//       firstPageParam,
//       allPageParams
//     ) => firstPage.prevCursor,
//   });
// };
