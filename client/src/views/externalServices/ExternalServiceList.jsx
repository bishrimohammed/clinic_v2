import React, { useMemo, useState } from "react";
import AddExternalServiceButton from "./AddExternalServiceButton";
import { useGetActiveExternalService } from "./hooks/useGetActiveExternalService";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { externalServiceColumn } from "./utils/externalServiceColumn";
import PaginationComponent from "../../components/PaginationComponent";
import { FaEye, FaSortDown, FaSortUp } from "react-icons/fa";
import { Spinner, Table } from "react-bootstrap";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { externalServicePaymentsColumn } from "../Bill/utils/externalServicePaymentsColumn";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const ExternalServiceList = () => {
  const user = useGetCurrentUser();
  let [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    // console.log(patients);
    setSearchParams({
      page: 1,
      limit: 10,
      sortBy: "service_date",
      order: "desc",
    });
    // setSearchParams({ search: "test" });
  }, []);
  const { data, isPending, isPlaceholderData } = useGetActiveExternalService({
    role: user.role.name,
    page: parseInt(searchParams.get("page")),
    limit: parseInt(searchParams.get("limit")),
    sortBy: searchParams.get("sortBy"),
    order: searchParams.get("order"),
  });

  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      const query = {
        role: user.role.name,
        page: parseInt(searchParams.get("page")) + 1,
        limit: parseInt(searchParams.get("limit")),
        sortBy: searchParams.get("sortBy"),
        order: searchParams.get("order"),
      };
      queryClient.prefetchQuery({
        queryKey: ["Active extrenal service", query],
        queryFn: () => fetchPatients(query),
      });
    }
  }, [data, isPlaceholderData, searchParams.get("page"), queryClient]);
  // console.log(data);
  // const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState([]);
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const navigate = useNavigate();
  // const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // // const [dropdownPosition, setDropdownPosition] = useState({});
  // const handleToggleDropdown = (index, event) => {
  //   setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  //   // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  // };
  // console.log(appointments);
  // const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => externalServiceColumn, []);
  const externalServiceData = useMemo(() => data || [], [data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: externalServiceData,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // state: {
    //   // globalFilter: debouncedValue,
    //   pagination: pagination,
    //   sorting,
    // },
    // onGlobalFilterChange: setSearch,
  });
  return (
    <div>
      <AddExternalServiceButton />
      <Table
        striped
        bordered
        hover
        responsive
        className="mt-2"
        // style={{ zIndex: 1, overflowY: "hidden" }}
      >
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {/* {headerEl.headers.map((columnEl, index) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder ? null : (
                        <div
                          className={
                            columnEl.column?.getCanSort()
                              ? "cursor-pointer select-none sort"
                              : ""
                          }
                          onClick={columnEl.column.getToggleSortingHandler()}
                          title={
                            columnEl.column.getCanSort()
                              ? columnEl.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : columnEl.column.getNextSortingOrder() ===
                                  "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                          {{
                            asc: <FaSortUp />,
                            desc: <FaSortDown />,
                          }[columnEl.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })} */}
                <th>#</th>
                <th>Patient Name</th>
                <th>Service Type</th>
                <th>Service Date</th>
                <th>Status</th>
                {/* <th></th> */}
                <th>Actions</th>
              </tr>
            );
          })}
        </thead>
        <tbody>
          {isPending && (
            <tr>
              <td className="  align-items-center" colSpan="8">
                <span>
                  <Spinner animation="border" size="sm" />
                </span>
              </td>
            </tr>
          )}
          {!isPending && data?.length === 0 && (
            <tr>
              <td className="  align-items-center" colSpan="8">
                <span className="text-danger fw-bold">No Record</span>
              </td>
            </tr>
          )}
          {!isPending &&
            tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                <tr
                  key={rowEl.id}
                  style={{ cursor: "pointer", zIndex: "-1" }}
                  onClick={() => {
                    // setShowViewEmployee(true);
                    // navigate("addresult", { state: rowEl.original });
                    // console.log("mmmmmmmmmmm");
                  }}
                >
                  {rowEl.getVisibleCells().map((cellEl, index) => {
                    return (
                      <td key={cellEl.id}>
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext()
                        )}
                      </td>
                    );
                  })}
                  <td
                    onClick={(e) => e.stopPropagation()}
                    style={
                      {
                        // zIndex: 8,
                        // overflow: "hidden",
                      }
                    }
                  >
                    <>
                      <div className="px-3">
                        {rowEl.original.service_type === "lab" && (
                          <FaEye
                            color="green"
                            onClick={() => {
                              // alert("sdkjfbewjkvh");
                              // console.log("sdmbcjsdvcdsg");
                              navigate("detail", { state: rowEl.original });
                            }}
                          />
                        )}
                      </div>
                    </>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {data?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
    </div>
  );
};

export default ExternalServiceList;
