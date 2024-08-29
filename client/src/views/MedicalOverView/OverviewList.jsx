import React from "react";
import { useGetMedicalOverview } from "./hooks/useGetMedicalOverview";
// import { Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ActiveMedicalRecordTable from "./ActiveMedicalRecordTable";

const OverviewList = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  // console.log(data);

  React.useEffect(() => {
    // console.log(patients);
    setSearchParams({
      page: 1,
      limit: 10,
      sortBy: "visit_date",
      order: "desc",
    });
    // setSearchParams({ search: "test" });
  }, []);
  const { data, isPending, isPlaceholderData } = useGetMedicalOverview({
    page: parseInt(searchParams.get("page")),
    limit: parseInt(searchParams.get("limit")),
    sortBy: searchParams.get("sortBy"),
    order: searchParams.get("order"),
  });
  // console.log(data);
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      const query = {
        page: parseInt(searchParams.get("page")) + 1,
        limit: parseInt(searchParams.get("limit")),
        sortBy: searchParams.get("sortBy"),
        order: searchParams.get("order"),
      };
      queryClient.prefetchQuery({
        queryKey: ["Patients", query],
        queryFn: () => fetchPatients(query),
      });
    }
  }, [data, isPlaceholderData, searchParams.get("page"), queryClient]);
  // const patients = useMemo(
  //   () => data?.patients || [],
  //   [data, isFetching, isPending]
  // );
  // const handlePagination = (page) => {
  //   setSearchParams((prev) => {
  //     prev.set("page", parseInt(page));

  //     return prev;
  //   });
  // };
  return (
    <div>
      <h4 className=" mb-0">Active Medical Record List</h4>
      <hr />
      <ActiveMedicalRecordTable data={data} />
    </div>
  );
};

export default OverviewList;
