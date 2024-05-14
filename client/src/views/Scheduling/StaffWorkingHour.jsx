import React, { useMemo } from "react";
import { useGetEmployees } from "../Administration/employee/hooks/useGetEmployees";
import { Spinner, Table } from "react-bootstrap";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetDoctors } from "./hooks/useGetDoctors";

const StaffWorkingHour = () => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isPending, isFetching, isLoading, error, refetch } =
    useGetDoctors();
  const navigate = useNavigate();
  const columns = [
    {
      header: "#",
      // id: "employees",
      accessorFn: (row, index) => index + 1,
    },
    {
      header: "Employee Name",

      accessorFn: (row, index) =>
        row.employee.firstName +
        " " +
        row.employee.middleName +
        " " +
        row.employee.lastName,
    },
    {
      header: "Gender",
      accessorFn: (row, index) => row.employee.gender,
    },
    {
      header: "Position",
      accessorFn: (row) =>
        row.role.name.charAt(0).toUpperCase() + row.role.name.slice(1),
    },
  ];
  const employeeData = useMemo(() => data || [], [data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: employeeData,

    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    state: {
      // globalFilter: debouncedValue,
      pagination: pagination,
      // sorting,
    },
    // onGlobalFilterChange: setSearch,
  });

  return (
    <>
      <div className="  d-flex gap-3 align-items-center">
        {/* <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        /> */}
        <h5 className="mb-0">Doctor Working Hour </h5>
      </div>
      <hr />
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
                        <div>
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
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
                  onClick={() => {
                    navigate("create", {
                      state: rowEl.original,
                    });
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
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="d-flex flex-wrap justify-content-center mt-md-1 mt-2 align-items-center gap-2">
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
      </div>
    </>
  );
};

export default StaffWorkingHour;
