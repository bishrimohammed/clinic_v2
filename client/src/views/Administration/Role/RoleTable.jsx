import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoles } from "./hooks/useGetRoles";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { columns } from "./utils/Column";
import { FaSortDown, FaSortUp, FaUserLock } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import SearchInput from "../../../components/inputs/SearchInput";
import useDebounce from "../../../hooks/useDebounce";
import { LuFilter } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgLockUnlock } from "react-icons/cg";

const RoleTable = ({
  roles,
  isPending,
  setShowViewRole,
  setShowDeactivateModal,
  setFilter,
  setShowFilter,
}) => {
  const navigate = useNavigate();
  // const { data: roles, isPending } = useGetRoles();
  const Columns = useMemo(() => columns, []);
  const rowData = useMemo(() => roles, [isPending]);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
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
  const tableInstance = useReactTable({
    columns: Columns,
    data: roles,
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
  if (isPending) {
    return <Spinner animation="border" />;
  }
  // console.log(roles);
  return (
    <div>
      {/* <button onClick={() => navigate("createrole")}>Add Role</button> */}
      <div className=" d-flex  gap-2 align-items-center w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <Button
          variant="secondary"
          className=""
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
      <div className="d-flex justify-content-between gap-2 align-items-center w-100 mb-1 mt-2">
        <Button className=" ms-auto " onClick={() => navigate("createrole")}>
          {"  "}
          +Add Role
        </Button>
      </div>
      <Table striped bordered hover responsive className="mt-2">
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
          {tableInstance.getRowModel()?.rows?.map((rowEl) => {
            return (
              <tr
                key={rowEl.id}
                style={{ cursor: "pointer", zIndex: "-1" }}
                onClick={() => {
                  //   setShowViewEmployee(true);
                  //   setEmployee(rowEl.original);
                  setShowViewRole({
                    isShow: true,
                    role: rowEl.original,
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
                        style={{ zIndex: "50" }}
                        onClick={(event) => {
                          event.stopPropagation();
                          // setData_to_be_Edited(rowEl.original);
                          // handleShowEdit();
                          navigate(`edit/${rowEl.original.id}`, {
                            state: rowEl.original,
                          });
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
                            setShowDeactivateModal({
                              roleId: rowEl.original.id,
                              isShow: true,
                              action: "Deactivate",
                            });
                            // setShowDelete(true);
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
                            setShowDeactivateModal({
                              roleId: rowEl.original.id,
                              isShow: true,
                              action: "Activate",
                            });
                            // setShowDelete(true);
                          }}
                        >
                          <CgLockUnlock /> Activate
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                {/* <td>
                  {
                    <div className="d-flex align-items-center gap-1">
                      <span
                        style={{ zIndex: "99" }}
                        className="p-1 bg-primary text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();
                          // setData_to_be_Edited(rowEl.original);
                          // handleShowEdit();
                          navigate(`edit/${rowEl.original.id}`, {
                            state: rowEl.original,
                          });
                        }}
                      >
                        <TbEdit />
                      </span>
                      <span
                        className="p-1 bg-warning text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowDeactivateModal({
                            roleId: rowEl.original.id,
                            isShow: true,
                            action: rowEl.original.status
                              ? "Deactivate"
                              : "Activate",
                          });
                          // setShowDelete(true);
                        }}
                      >
                        <FaUserLock />
                      </span>
                    </div>
                  }
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex align-items-center gap-2">
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
    </div>
  );
};

export default RoleTable;
