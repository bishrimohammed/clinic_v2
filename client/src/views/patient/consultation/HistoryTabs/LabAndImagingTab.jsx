import React, { useMemo, useState } from "react";
import { useGetPatientLabs } from "../../hooks/consultationHooks/PatientOverViewHooks/useGetPatientLabs";
import { Spinner, Table } from "react-bootstrap";
import { format } from "date-fns";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PaginationComponent from "../../../../components/PaginationComponent";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { labsColumn } from "../utils/labsColumn";
// const columnHelper = createColumnHelper();
const LabAndImagingTab = ({ patientId }) => {
  // const {data} =
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // const {
  //   data: labs,
  //   isPending,
  //   // data,
  //   hasNextPage,
  //   hasPreviousPage,
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   pageIndex,
  //   pageSize,
  // } = useGetPatientLabs(patientId, pagination.pageSize);
  const { data: labs, isPending } = useGetPatientLabs(patientId);
  // console.log(labs);
  // const labsColumn = [
  //   {
  //     header: "#",
  //     accessorFn: (row, index) => index + 1,
  //   },
  //   {
  //     header: "Test Name",
  //     accessorFn: (row) => row.test.service_name,
  //   },
  //   {
  //     header: "Requested By",
  //     accessorFn: (row) =>
  //       row.requestedBy?.employee?.firstName +
  //       " " +
  //       row.requestedBy?.employee?.middleName,
  //   },
  //   {
  //     header: "Requested Time",
  //     accessorFn: (row) =>
  //       format(new Date(row.order_time), "yyyy-MM-dd") +
  //       "    " +
  //       format(new Date(row.order_time), "hh:mm a"),
  //   },
  //   columnHelper.accessor("status", {
  //     header: "Status",
  //     enableGlobalFilter: false,
  //     enableSorting: false,
  //     cell: (s) => {
  //       // console.log(url);
  //       return (
  //         <span
  //           style={{
  //             borderRadius: 15,
  //             padding: "0.2rem 0.5rem",
  //             fontSize: 13,
  //             fontWeight: 500,
  //             backgroundColor:
  //               s.getValue() === "completed" ? "green" : "#ffc107",
  //             color: s.getValue() === "completed" ? "white" : "white",
  //           }}
  //           className="d-inline-flex align-items-center justify-content-center"
  //         >
  //           {s.getValue()}
  //         </span>
  //       );
  //     },
  //   }),
  // ];
  // return;
  const columns = useMemo(() => labsColumn, []);
  const labsData = useMemo(() => labs || [], [labs]);
  const tableInstance = useReactTable({
    columns: columns,
    data: labsData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: false,
    state: {
      pagination: pagination,
      sorting,
    },
  });
  return (
    <div>
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
              <tr key={headerEl.id} className="text-nowrap">
                {headerEl.headers.map((columnEl, index) => {
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
                          {
                            {
                              asc: <FaSortUp />,
                              desc: <FaSortDown />,
                            }[columnEl.column.getIsSorted()]
                          }
                          {columnEl.column.id === "Name" &&
                            columnEl.column() && (
                              <span>
                                {columnEl.column.getNextSortingOrder() ===
                                  "asc" && <FaSortUp />}
                                {columnEl.column.getNextSortingOrder() ===
                                  "desc" && <FaSortDown />}
                              </span>
                            )}
                        </div>
                      )}
                    </th>
                  );
                })}
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
          {!isPending &&
            tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                <tr
                  key={rowEl.id}
                  style={{ cursor: "pointer", zIndex: "-1" }}
                  className="text-nowrap"
                  // onClick={() => {
                  //   setShowViewPatient({
                  //     isShow: true,
                  //     patient: rowEl.original,
                  //   });
                  // }}
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
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* <Table bordered striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Test Name</th>
            <th>Requested By</th>
            <th>Requested Time</th>
            <th>Result</th>

            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {labs?.pages
            // ?.filter((i) => !i.test.labTestProfile.isPanel)
            ?.map((page, index) => (
              // <React.Fragment key={index}>
              //   {page?.map((investigation, index) => (
              //     <tr key={investigation.id}>
              //       <td>{index + 1}</td>
              //       <td>{investigation.test?.service_name}</td>
              //       <td>
              //         {investigation.requestedBy?.employee?.firstName}{" "}
              //         {investigation.requestedBy?.employee?.middleName}
              //       </td>
              //       <td>
              //         {format(
              //           new Date(investigation.order_time),
              //           "yyyy-MM-dd"
              //         ) +
              //           "    " +
              //           format(new Date(investigation.order_time), "hh:mm a")}
              //       </td>
              //       <td>
              //         {investigation?.result ? (
              //           investigation.result
              //         ) : (
              //           <span className="text-danger">__</span>
              //         )}
              //       </td>
              //       <td>
              //         {investigation.reportedBy ? (
              //           investigation.reportedBy?.employee?.firstName +
              //           " " +
              //           investigation.reportedBy?.employee?.middleName
              //         ) : (
              //           <span className="text-danger">__</span>
              //         )}
              //       </td>
              //       <td>
              //         {investigation.report_time ? (
              //           format(
              //             new Date(investigation.report_time),
              //             "yyyy-MM-dd"
              //           ) +
              //           "    " +
              //           format(new Date(investigation.report_time), "hh:mm a")
              //         ) : (
              //           <span className="text-danger">__</span>
              //         )}
              //       </td>

              //       <td>
              //         <span
              //           style={{
              //             borderRadius: 15,
              //             padding: "0.2rem 0.5rem",
              //             fontSize: 13,
              //             fontWeight: 500,
              //             backgroundColor:
              //               investigation.status === "completed"
              //                 ? "green"
              //                 : "#ffc107",
              //             color:
              //               investigation.status === "completed"
              //                 ? "white"
              //                 : "white",
              //           }}
              //           className="d-inline-flex align-items-center justify-content-center"
              //         >
              //           {investigation.status}
              //         </span>
              //       </td>
              //     </tr>
              //   ))}
              // </React.Fragment>
            ))}
        </tbody>
      </Table> */}
      {/* <div
        style={{ zIndex: 0 }}
        className="d-flex flex-wrap justify-content-center mt-md-1 mt-2 align-items-center gap-2"
      >
        
        <button
          // className="btn  px-2 btn-sm"
          onClick={fetchPreviousPage()}
          disabled={!hasPreviousPage}
        >
          &lt;
       
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          &gt;
        </button>
        
        <span className="d-flex align-items-center gap-1">
          <div>Page</div>
          <strong className="d-flex align-items-center gap-1">
            {tableInstance.getState().pagination.pageIndex + 1} of{" "}
            {tableInstance.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="d-flex align-items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={tableInstance.getState().pagination.pageIndex + 1}
            // defaultValue={tableInstance.options.state.pagination.pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              tableInstance.setPageIndex(page);
            }}
            className="form-control w-25"
          />
        </span>
        <select
          value={tableInstance.getState().pagination.pageSize}
          // value={tableInstance.options.state.pagination.pageIndex}
          onChange={(e) => {
            tableInstance.setPageSize(Number(e.target.value));
          }}
          // className="form-select"
        >
          {[3, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
      {labs?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
      {/* <Table bordered striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Test Name</th>
            <th>Requested By</th>
            <th>Requested Time</th>
            <th>Result</th>
           
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {labs
            // ?.filter((i) => !i.test.labTestProfile.isPanel)
            ?.map((investigation, index) => (
              <tr key={investigation.id}>
                <td>{index + 1}</td>
                <td>{investigation.test?.service_name}</td>
                <td>
                  {investigation.requestedBy?.employee?.firstName}{" "}
                  {investigation.requestedBy?.employee?.middleName}
                </td>
                <td>
                  {format(new Date(investigation.order_time), "yyyy-MM-dd") +
                    "    " +
                    format(new Date(investigation.order_time), "hh:mm a")}
                </td>
                <td>
                  {investigation?.result ? (
                    investigation.result
                  ) : (
                    <span className="text-danger">__</span>
                  )}
                </td>
                <td>
                  {investigation.reportedBy ? (
                    investigation.reportedBy?.employee?.firstName +
                    " " +
                    investigation.reportedBy?.employee?.middleName
                  ) : (
                    <span className="text-danger">__</span>
                  )}
                </td>
                <td>
                  {investigation.report_time ? (
                    format(new Date(investigation.report_time), "yyyy-MM-dd") +
                    "    " +
                    format(new Date(investigation.report_time), "hh:mm a")
                  ) : (
                    <span className="text-danger">__</span>
                  )}
                </td>

                <td>
                  <span
                    style={{
                      borderRadius: 15,
                      padding: "0.2rem 0.5rem",
                      fontSize: 13,
                      fontWeight: 500,
                      backgroundColor:
                        investigation.status === "completed"
                          ? "green"
                          : "#ffc107",
                      color:
                        investigation.status === "completed"
                          ? "white"
                          : "white",
                    }}
                    className="d-inline-flex align-items-center justify-content-center"
                  >
                    {investigation.status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default LabAndImagingTab;
