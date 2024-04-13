import React, { useMemo, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ServiceItemColumns } from "../utils/ServiceItemColumns";
import { FaUserLock } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import SearchInput from "../../../../components/inputs/SearchInput";

const ServiceItemTable = ({ items }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const debouncedValue = useDebounce(search, 500);
  const Columns = useMemo(() => ServiceItemColumns, []);
  const tableInstance = useReactTable({
    columns: Columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      globalFilter: debouncedValue,
      pagination: pagination,
    },
    onGlobalFilterChange: setSearch,
  });

  return (
    <div className="p-3">
      <h5>Clinic Service List</h5>
      <hr />
      <div className=" d-flex justify-content-between flex-wrap gap-2 align-items-center w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <div className="d-flex gap-2">
          <Button
            className=" ms-auto "
            onClick={() => navigate("createlabservice")}
          >
            {"  "}+ New Item
          </Button>
          <Button>+ New Group</Button>
        </div>
      </div>
      <Table striped responsive bordered>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id}>
                      {flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
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
                  navigate("viewserviceitems", {
                    state: rowEl.original,
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
                <td>
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
                </td>
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
