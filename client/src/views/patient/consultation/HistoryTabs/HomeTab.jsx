import React, { useMemo } from "react";
import { useGetPatientResentData } from "../../hooks/consultationHooks/PatientOverViewHooks/useGetPatientResentData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { patientclinicalDataColumn } from "../utils/patientclinicalDataColumn";
import { Spinner, Table } from "react-bootstrap";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { labsColumn } from "../utils/labsColumn";
import { PrescriptionsColumn } from "../utils/prescriptionColumn";
import { getBrandColor } from "../../../../utils/getBrandColor";

const ResentClinicalDataTable = ({ Data, isPending }) => {
  const columns = useMemo(() => patientclinicalDataColumn, []);
  const clinicalData = useMemo(() => Data || [], [Data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: clinicalData,
    getCoreRowModel: getCoreRowModel(),

    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // state: {
    //   // globalFilter: debouncedValue,
    //   pagination: pagination,
    //   sorting,
    // },
    // onGlobalFilterChange: setSearch,
    // defaultSortColumn: "Name", // Set the default sort column
    // defaultSortDirection: "asc",
  });
  return (
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
                  <th
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                    className="text-nowrap"
                  >
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
                              : columnEl.column.getNextSortingOrder() === "desc"
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
  );
};
const ResentPatientLabsTable = ({ Data, isPending }) => {
  const columns = useMemo(() => labsColumn, []);
  const labsData = useMemo(() => Data || [], [Data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: labsData,
    getCoreRowModel: getCoreRowModel(),

    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // state: {
    //   // globalFilter: debouncedValue,
    //   pagination: pagination,
    //   sorting,
    // },
    // onGlobalFilterChange: setSearch,
    // defaultSortColumn: "Name", // Set the default sort column
    // defaultSortDirection: "asc",
  });
  return (
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
                  <th
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                    className="text-nowrap"
                  >
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
                              : columnEl.column.getNextSortingOrder() === "desc"
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
                    <td key={cellEl.id} className="text-nowrap">
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
  );
};
const ResentPatientPrescriptionTable = ({ Data, isPending }) => {
  const columns = useMemo(() => PrescriptionsColumn, []);
  const prescriptionData = useMemo(() => Data || [], [Data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: prescriptionData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
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
                  <th
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                    className="text-nowrap"
                  >
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
                              : columnEl.column.getNextSortingOrder() === "desc"
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
                    <td key={cellEl.id} className="text-nowrap">
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
  );
};
const HomeTab = ({ patientId }) => {
  const { data, isPending } = useGetPatientResentData(patientId);
  // console.log(data);
  return (
    <div>
      <div>
        <h6 style={{ color: getBrandColor() }} className="mb-1 ps-2">
          Resent Clinical Data
        </h6>
        <ResentClinicalDataTable
          Data={data?.clinicDatas}
          isPending={isPending}
        />
      </div>
      <div>
        <h6 style={{ color: getBrandColor() }} className="mb-1 ps-2">
          Resent labs
        </h6>
        <ResentPatientLabsTable
          Data={data?.patientlabs}
          isPending={isPending}
        />
      </div>
      <div>
        <h6 style={{ color: getBrandColor() }} className="mb-1 ps-2">
          Resent Prescriptions
        </h6>
        <ResentPatientPrescriptionTable
          Data={data?.prescribedMedicines}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default HomeTab;
