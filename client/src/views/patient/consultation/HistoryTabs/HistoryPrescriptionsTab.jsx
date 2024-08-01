import React, { useMemo, useState } from "react";
import { useGetPatientPrescriptions } from "../../hooks/consultationHooks/PatientOverViewHooks/useGetPatientPrescriptions";
import { PrescriptionsColumn } from "../utils/prescriptionColumn";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PaginationComponent from "../../../../components/PaginationComponent";
import { Spinner, Table } from "react-bootstrap";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const HistoryPrescriptionsTab = ({ patientId }) => {
  const { data, isPending } = useGetPatientPrescriptions({ patientId });
  // console.log(data);
  // const { data, isPending } = useGetClinicData(patientId);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo(() => PrescriptionsColumn, []);
  const prescriptionsData = useMemo(() => data || [], [data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: prescriptionsData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      // globalFilter: debouncedValue,
      pagination: pagination,
      sorting,
    },
    // onGlobalFilterChange: setSearch,
    // defaultSortColumn: "Name", // Set the default sort column
    // defaultSortDirection: "asc",
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
              <tr key={headerEl.id}>
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
                          {/* {columnEl.column.id === "Name" &&
                            columnEl.column.() && (
                              <span>
                                {columnEl.column.getNextSortingOrder() ===
                                  "asc" && <FaSortUp />}
                                {columnEl.column.getNextSortingOrder() ===
                                  "desc" && <FaSortDown />}
                              </span>
                            )} */}
                        </div>
                      )}
                    </th>
                  );
                })}

                {/* <th>Actions</th> */}
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
      {data?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
    </div>
  );
};

export default HistoryPrescriptionsTab;
