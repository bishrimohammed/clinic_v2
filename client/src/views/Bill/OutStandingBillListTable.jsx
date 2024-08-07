import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { OutStandingBillColumns } from "./utils/OutStandingBillColumns";

import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { hasPermission } from "../../utils/hasPermission";
import { LuFilter } from "react-icons/lu";
import SearchInput from "../../components/inputs/SearchInput";
import { useNavigate } from "react-router-dom";
// import AddAdvancedPaymentButton from "./AddAdvancedPaymentButton";
import FilterOutStandingBilligModal from "./FilterOutStandingBilligModal";
import { useGetOutStandingPayments } from "./hooks/useGetDraftPayments";
import PaginationComponent from "../../components/PaginationComponent";

const OutStandingBillListTable = (
  {
    // billings,
    // isPending,
    // refetch,
    // isRefetching,
  }
) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    visit_date: "",
    visit_type: "",
    stage: "",
  });
  const {
    data: bills,
    isPending,
    refetch,
    isRefetching,
  } = useGetOutStandingPayments(filter);
  // console.log(bills);
  const billings = useMemo(() => bills || [], [bills]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => OutStandingBillColumns, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: billings,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      globalFilter: debouncedValue,
      pagination: pagination,
      sorting,
    },
    onGlobalFilterChange: setSearch,
  });
  return (
    <>
      <div className=" d-flex flex-wrap  gap-2 align-items-center p-1 w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <Button
          variant="secondary"
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilterModal(true)}
        >
          <LuFilter size={16} /> Filter
        </Button>
        <Button
          variant="warning"
          onClick={() => setFilter({ stage: "", status: "", vistiType: "" })}
        >
          Reset
        </Button>
      </div>
      <div className="d-flex justify-content-end gap-2 align-items-center w-100 mb-1 mt-2">
        <button
          disabled={isRefetching}
          onClick={refetch}
          type="button"
          className="btn btn-success d-flex align-items-center gap-2 "
        >
          {/* <IoReloadOutline /> */}
          {isRefetching ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <IoReloadOutline />
          )}
          Reload
        </button>
        {hasPermission("visit", "create") && (
          <Button
            className="btn btn-primary ms-auto"
            onClick={() => setShowAddPatientVisitModal(true)}
          >
            + Add Visit
          </Button>
        )}
      </div>
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
                          {{
                            asc: <FaSortUp />,
                            desc: <FaSortDown />,
                          }[columnEl.column.getIsSorted()] ?? null}
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
          {!isPending && billings?.length === 0 && (
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
                    navigate("detail", { state: rowEl.original });
                    // setShowViewEmployee(true);
                    // setShowViewAppointment({
                    //   isShow: true,
                    //   appointment: rowEl.original,
                    // });
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
                  {/* <td
                    className="p-0"
                    onClick={(e) => e.stopPropagation()}
                    style={
                      {
                        // zIndex: 8,
                        // overflow: "hidden",
                      }
                    }
                  >                   
                    <Dropdown
                      id={rowEl.original.id + "dropdown"}
                      autoClose="outside"
                      drop="centered"
                      as="div"
                      //
                      // show={openDropdowns[rowEl.original.id]}
                      onToggle={(event) => handleToggleDropdown(null, event)}
                      show={openDropdownIndex === rowEl.original.id}
                    ></Dropdown>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
      {billings?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
      {showFilterModal && (
        <FilterOutStandingBilligModal
          show={showFilterModal}
          handleClose={() => setShowFilterModal(false)}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </>
  );
};

export default OutStandingBillListTable;
