import React from "react";
import {
  fetchActiveMedicalRecord,
  useGetMedicalOverview,
} from "./hooks/useGetMedicalOverview";
// import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ActiveMedicalRecordTable from "./ActiveMedicalRecordTable";
import { useURLPagination } from "../../hooks/useURLPagination";
import { AxiosHeaders } from "../../api/useAxiosHeaders";

const OverviewList = () => {
  // let [searchParams, setSearchParams] = useSearchParams();
  // React.useEffect(() => {
  //   setSearchParams({
  //     page: 1,
  //     limit: 10,
  //     sortBy: "visit_date",
  //     order: "desc",
  //   });
  // }, []);
  // const { data, isPending, isPlaceholderData } = useGetMedicalOverview({
  //   page: parseInt(searchParams.get("page")),
  //   limit: parseInt(searchParams.get("limit")),
  //   sortBy: searchParams.get("sortBy"),
  //   order: searchParams.get("order"),
  // });
  // const queryClient = useQueryClient();
  // React.useEffect(() => {
  //   if (!isPlaceholderData && data?.hasMore) {
  //     const query = {
  //       page: parseInt(searchParams.get("page")) + 1,
  //       limit: parseInt(searchParams.get("limit")),
  //       sortBy: searchParams.get("sortBy"),
  //       order: searchParams.get("order"),
  //     };
  //     queryClient.prefetchQuery({
  //       queryKey: ["Patients", query],
  //       queryFn: () => fetchPatients(query),
  //     });
  //   }
  // }, [data, isPlaceholderData, searchParams.get("page"), queryClient]);

  return (
    <div>
      <h4 className=" mb-0">Active Medical Record List</h4>
      <hr />
      <ActiveMedicalRecordTable />
    </div>
  );
};

export default OverviewList;
