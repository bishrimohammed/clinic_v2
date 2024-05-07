import React, { useMemo, useState } from "react";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import { Company_Column } from "./utils/company_Column";
import useDebounce from "../../../hooks/useDebounce";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { FaSortDown, FaSortUp, FaUserLock } from "react-icons/fa6";
import { CgLockUnlock } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchInput from "../../../components/inputs/SearchInput";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const CreditCompanyTable = ({
  setShowAddCreditCompanyModal,
  companies,
  isPending,
  setShowFilter,
  setUpdateCreditCompany,
  setShowDeactiveModal,
  setViewCompanyDetail,
  setFilter,
}) => {
  // console.log(companies);
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
  const navigate = useNavigate();
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => Company_Column, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: companies,

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
    // <div>
    //   CreditCompanyTable
    //   <Button onClick={() => setShowAddCreditCompanyModal(true)}>ADD +</Button>
    // </div>
    <>
      <div className=" d-flex flex-wrap  gap-2 align-items-center  w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />

        <Button
          variant="secondary"
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilter(true)}
        >
          <LuFilter size={16} /> Filter
        </Button>
        <Button variant="warning" onClick={() => setFilter({ status: "" })}>
          Reset
        </Button>
      </div>
      <div className="d-flex justify-content-between gap-2 align-items-center w-100 mb-1 mt-2">
        <Button
          className="ms-auto"
          onClick={() => setShowAddCreditCompanyModal(true)}
        >
          + Add Company
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
                    navigate("detail", {
                      state: rowEl.original,
                    });
                    // setViewCompanyDetail({
                    //   isShow: true,
                    //   company: rowEl.original,
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
                            setUpdateCreditCompany({
                              isShow: true,
                              company: rowEl.original,
                              //  status: rowEl.original.status,
                            });
                            // handleShowEdit();
                          }}
                        >
                          <RiEditLine /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          disabled={!rowEl.original.status}
                          style={{ zIndex: "50" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            setViewCompanyDetail({
                              isShow: true,
                              company: rowEl.original,
                            });
                            // handleShowEdit();
                          }}
                        >
                          <MdOutlineRemoveRedEye /> View
                        </Dropdown.Item>
                        {rowEl.original.status ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setShowDeactiveModal({
                                id: rowEl.original.id,
                                isShow: true,
                                action: "Close",
                              });
                              // setShowDelete(true);
                            }}
                          >
                            <FaUserLock color="red" /> Terminate Agreement
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setShowDeactiveModal({
                                id: rowEl.original.id,
                                isShow: true,
                                action: "Open",
                              });
                            }}
                          >
                            <CgLockUnlock /> open Agreement
                          </Dropdown.Item>
                        )}

                        {/* <Dropdown.Item
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowDeactiveModal({
                             id: rowEl.original.id,
                              isShow: true,
                              action: "Delete",
                            });
                           
                          }}
                          className="d-flex gap-2 align-items-center"
                        >
                          <RiDeleteBin6Line color="red" /> Delete
                        </Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
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

export default CreditCompanyTable;
