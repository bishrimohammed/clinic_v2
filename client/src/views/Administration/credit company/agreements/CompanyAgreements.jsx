import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Host_URL } from "../../../../utils/getHost_URL";
import { FaLock, FaSortDown, FaSortUp, FaUserLock } from "react-icons/fa6";
import TerminateAgreementModal from "./TerminateAgreementModal";
import RenewAgreemnet from "./RenewAgreemnet";
import PaginationComponent from "../../../../components/PaginationComponent";
// import RenewAgreemnet from "./RenewAgreemnet";
const columnHelper = createColumnHelper();

const CompanyAgreements = ({ agreements, isPending }) => {
  // console.log(agreements);

  const columns = [
    {
      header: "#",
      accessorFn: (row, index) => index + 1,
    },
    {
      header: "Start Date",
      accessorFn: (row) => format(row.start_date, "MM/dd/yyyy"),
    },
    {
      header: "End Date",
      accessorFn: (row) => format(row.end_date, "MM/dd/yyyy"),
    },
    {
      header: "Maximum Limit",
      accessorFn: (row) => row.max_limit,
    },
    columnHelper.accessor("agreement_doc", {
      header: "Agreement File",
      cell: (a) => {
        return (
          <Button
            //className="downloadbtn"
            type="submit"
            href={Host_URL + a.getValue()}
            target="_blank"
            bsPrefix="downloadbtn"
          >
            File
          </Button>
        );
      },
    }),
    columnHelper.accessor("status", {
      cell: (s) => {
        // console.log(url);
        return s.getValue() == true ? (
          <span
            style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
            className=" text-white bg-success   d-inline-flex align-items-center justify-content-center"
          >
            active
          </span>
        ) : (
          <span
            style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
            className=" text-white bg-danger d-inline-flex align-items-center justify-content-center"
          >
            inactive
          </span>
        );
      },
    }),
  ];
  const AgrementData = useMemo(() => agreements || [], [agreements]);
  const COLUMNS = useMemo(() => columns, []);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showTerminateModal, setShowTerminateModal] = useState({
    show: false,
    id: null,
  });
  const [showRenewAgreement, setShowRenewAgreement] = useState(false);
  const tableInstance = useReactTable({
    columns: COLUMNS,
    data: AgrementData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination: pagination,
      sorting,
    },
  });
  return (
    <div>
      <div className="d-flex justify-content-end pt-2">
        <Button
          disabled={agreements?.some((a) => a.status)}
          onClick={() => setShowRenewAgreement(true)}
        >
          + Renew Agreement
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
                  style={{ zIndex: "-1" }}
                  onClick={() => {
                    // navigate("detail", {
                    //   state: rowEl.original,
                    // });
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
                    <button
                      // role="button"
                      disabled={!rowEl.original.status}
                      // disabled={true}
                      onClick={() =>
                        setShowTerminateModal({
                          show: true,
                          id: rowEl.original.id,
                        })
                      }
                      className="p-2 h-100 curserpointer border-0"
                    >
                      <FaLock color="red" />{" "}
                    </button>
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
      {AgrementData?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
      {showTerminateModal.show && (
        <TerminateAgreementModal
          show={showTerminateModal}
          handleClose={setShowTerminateModal}
          id={showTerminateModal.id}
        />
      )}
      {showRenewAgreement && (
        <RenewAgreemnet
          show={showRenewAgreement}
          handleClose={setShowRenewAgreement}
          // id={showRenewAgreement.id}
          compnayId={showRenewAgreement.compnayId}
        />
      )}
    </div>
  );
};

export default CompanyAgreements;
