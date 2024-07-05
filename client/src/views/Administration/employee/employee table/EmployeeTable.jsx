import React, { useMemo, useState } from "react";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import SearchInput from "../../../../components/inputs/SearchInput";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { CgLockUnlock } from "react-icons/cg";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { COLUMNS } from "../utils/COLUMNS";
import { FaUserLock } from "react-icons/fa";

import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import useDebounce from "../../../../hooks/useDebounce";
import BulkImportButton from "../bulkImport/BulkImportButton";
import PaginationComponent from "../../../../components/PaginationComponent";

const EmployeeTable = ({
  setAddEmployeeModal,
  handleShowEdit,
  setData_to_be_Edited,
  Data,
  isPending,
  setSelectedEmployee,
  setShowDelete,
  setShowViewEmployee,
  setEmployee,
  setFilter,
  setShowFilter,
}) => {
  const [search, setSearch] = useState("");
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
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: Data,

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
          onClick={() => setShowFilter(true)}
        >
          <LuFilter size={16} /> Filter
        </Button>
        <Button
          variant="warning"
          onClick={() => setFilter({ status: "", position: [], gender: "" })}
        >
          Reset
        </Button>
      </div>
      <div className="d-flex justify-content-end gap-2 align-items-center w-100 mb-1 mt-2">
        <BulkImportButton />
        <Button className="  btn-sm " onClick={() => setAddEmployeeModal(true)}>
          {"  "}
          +Add Employee
        </Button>
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
                  onClick={() => {
                    setShowViewEmployee(true);
                    setEmployee(rowEl.original);
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
                    className="p-0"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      zIndex: "0",
                    }}
                  >
                    <Dropdown
                      id={rowEl.original.id + "dropdown"}
                      autoClose="outside"
                      //
                      // show={openDropdowns[rowEl.original.id]}
                      onToggle={(event) => handleToggleDropdown(null, event)}
                      show={openDropdownIndex === rowEl.original.id}
                    >
                      <Dropdown.Toggle
                        caret="false"
                        className="employee-dropdown px-3"
                        style={{ zIndex: 6 }}
                        id={`dropdown-${rowEl.original.id}`}
                        onClick={(event) =>
                          handleToggleDropdown(rowEl.original.id, event)
                        }
                      >
                        <span
                          // style={{ color: "red", zIndex: -1 }}
                          className="text-dark"
                        >
                          <BsThreeDotsVertical />
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          disabled={!rowEl.original.status}
                          style={{ zIndex: "50" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            setData_to_be_Edited(rowEl.original);
                            handleShowEdit();
                          }}
                        >
                          <RiEditLine /> Edit
                        </Dropdown.Item>
                        {rowEl.original.status ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedEmployee({
                                id: rowEl.original.id,
                                selectedFor: "deactivate",
                              });
                              setShowDelete(true);
                            }}
                          >
                            <FaUserLock color="red" /> Deactivate
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedEmployee({
                                id: rowEl.original.id,
                                selectedFor: "activate",
                              });
                              setShowDelete(true);
                            }}
                          >
                            <CgLockUnlock /> Activate
                          </Dropdown.Item>
                        )}
                        {/* <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedEmployee({
                              id: rowEl.original.id,
                              selectedFor: "deactivate",
                            });
                            setShowDelete(true);
                          }}
                        >
                          <FaUserLock /> Deactivate
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedEmployee({
                              id: rowEl.original.id,
                              selectedFor: "delete",
                            });
                            setShowDelete(true);
                          }}
                          className="d-flex gap-2 align-items-center"
                        >
                          <RiDeleteBin6Line color="red" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {/* <div className="d-flex flex-wrap justify-content-center mt-md-1 mt-2 align-items-center gap-2">
        <button
          className="border-0"
          style={{ outline: "none" }}
          onClick={() => tableInstance.firstPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          &lt;&lt;
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          &lt;
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          &gt;
        </button>
        <button
          // className="btn btn-outline-secondary"
          onClick={() => tableInstance.lastPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          &gt;&gt;
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
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
      {Data?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
    </>
  );
};
// const MemoizedEmployeeTable = React.memo(EmployeeTable);
// export default MemoizedEmployeeTable;
export default EmployeeTable;
