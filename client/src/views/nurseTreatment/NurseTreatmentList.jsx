import React, { useState, useMemo } from "react";
import { useGetActiveTreatment } from "./hooks/useGetActiveTreatment";
import { Spinner } from "react-bootstrap";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../components/PaginationComponent";
import { Button, Table } from "react-bootstrap";
import { ActiveTreatmmentColumn } from "./utils/ActiveTreatmmentColumn";
import ViewTreatmentDetailModal from "./ViewTreatmentDetailModal";
const NurseTreatmentList = () => {
  const { data, isPending } = useGetActiveTreatment();
  //   console.log(data);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo(() => ActiveTreatmmentColumn, []);
  const treatmentData = useMemo(() => data || [], [data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: treatmentData,

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
  const [showTreatment, setShowTreatment] = useState({
    show: false,
    treatment: null,
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
                  <td>
                    <button
                      onClick={() => {
                        setShowTreatment({
                          show: true,
                          treatment: rowEl.original,
                        });
                      }}
                      className="btn btn-sm btn-info ms-2"
                    >
                      View
                    </button>
                    {/* <button className="btn btn-sm btn-success ms-2">
                      Excute
                    </button> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {data?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
      {showTreatment.show && (
        <ViewTreatmentDetailModal
          show={showTreatment.show}
          handleClose={() => setShowTreatment({ show: false, treatment: null })}
          treatment={showTreatment.treatment}
        />
      )}
    </div>
  );
};

export default NurseTreatmentList;
