import React, { useMemo, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Dropdown } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ServiceItemColumns } from "../utils/ServiceItemColumns";
import { FaSortDown, FaSortUp, FaUserLock } from "react-icons/fa";
// import { TbEdit } from "react-icons/tb";
import SearchInput from "../../../../components/inputs/SearchInput";
import { CgLockUnlock } from "react-icons/cg";
import { RiEditLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";

const ServiceItemTable = ({
  items,
  setShowDeactiveModal,
  setFilter,
  setShowFilter,
  serviceName,
  setViewServiceItem,
  setUpdateServiceItemModal,
  setShowServiceGroupModal,
}) => {
  const navigate = useNavigate();
  const service = useLocation().state;
  // console.log(service);
  const [search, setSearch] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const debouncedValue = useDebounce(search, 500);
  const Columns = useMemo(() => ServiceItemColumns, []);
  const tableInstance = useReactTable({
    columns: Columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      globalFilter: debouncedValue,
      pagination: pagination,
      sorting: sorting,
    },
    onGlobalFilterChange: setSearch,
  });
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  return (
    <div className="p-3">
      <div className="d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h5>{serviceName} Service Items</h5>
      </div>

      <hr />
      <div className=" d-flex flex-wrap  gap-2 align-items-center p-1 w-100  mt-2">
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
          onClick={() => setFilter({ status: "", groups: [] })}
        >
          Reset
        </Button>
      </div>
      <div className=" d-flex justify-content-end gap-2 mb-2">
        {/* <SearchInput searchvalue={search} setSearch={setSearch} /> */}

        <Button
          className=" ms-auto "
          onClick={() =>
            navigate("/administrations/services/createserviceitem", {
              state: service,
            })
          }
        >
          {"  "}+ New Item
        </Button>
        <Button onClick={() => setShowServiceGroupModal(true)}>Groups</Button>
      </div>
      <Table striped responsive bordered>
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
          {tableInstance.getRowModel().rows.map((rowEl, index) => {
            return (
              <tr
                key={rowEl.id}
                style={{ cursor: "pointer", zIndex: "-1" }}
                onClick={() =>
                  // navigate("viewserviceitems", {
                  //   state: rowEl.original,
                  // })
                  setViewServiceItem({
                    isShow: true,
                    serviceItem: rowEl.original,
                  })
                }
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
                          setUpdateServiceItemModal({
                            isShow: true,
                            serviceItem: rowEl.original,
                          });
                          // setData_to_be_Edited(rowEl.original);
                          // handleShowEdit();
                        }}
                      >
                        <RiEditLine /> Edit{" "}
                      </Dropdown.Item>
                      {rowEl.original.status ? (
                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowDeactiveModal({
                              isShow: true,
                              id: rowEl.original.id,
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
                            setShowDeactiveModal({
                              isShow: true,
                              id: rowEl.original.id,
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
                          setData_to_be_Edited(rowEl.original);
                          handleShowEdit();
                        }}
                      >
                        <TbEdit />
                      </span>
                      <span
                        className="p-1 bg-warning text-white d-flex align-items-center justify-content-center"
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowDeactiveModal({
                            isShow: true,
                            id: rowEl.original.id,
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

export default ServiceItemTable;
