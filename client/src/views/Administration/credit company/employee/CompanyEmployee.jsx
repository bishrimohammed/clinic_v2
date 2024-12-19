import React, { useState, useMemo } from "react";
import AddCompanyEmployeeModal from "./AddCompanyEmployee";
import { Button, Table, Spinner, Dropdown } from "react-bootstrap";
import { CompanyEmployeeColumns } from "../utils/CompanyEmployeeColumn";
import { useGetCompanyEmployees } from "../hooks/useGetCompanyEmployees";
import { useLocation } from "react-router-dom";

import { FaSortDown, FaSortUp, FaUnlock, FaUserLock } from "react-icons/fa6";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RiEditLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import UpdateCompanyEmployeeModal from "./UpdateCompanyEmployeeModal";
import DeactivateEmaployeeModal from "./DeactivateEmaployeeModal";
import ViewCompanyEmployeeDetail from "./ViewCompanyEmployeeDetail";
import PaginationComponent from "../../../../components/PaginationComponent";

const CompanyEmployee = () => {
  const [showAddCompanyEmployeeModal, setShowAddCompanyEmployeeModal] =
    useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { state } = useLocation();
  const { data: employees, isPending } = useGetCompanyEmployees(state.id);
  const employeesData = useMemo(() => employees || [], [employees, isPending]);
  const columns = useMemo(() => CompanyEmployeeColumns, []);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    employee: null,
  });
  const [showDeactivateModal, setShowDeactivateModal] = useState({
    isShow: false,
    employeeId: null,
    action: "",
  });
  const [showViewModal, setShowViewModal] = useState({
    isShow: false,
    employee: null,
  });
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };
  const tableInstance = useReactTable({
    columns: columns,
    data: employeesData,
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
      <div className="d-flex justify-content-end py-2">
        <Button
          //   disabled={agreements?.some((a) => a.status)}
          onClick={() => setShowAddCompanyEmployeeModal(true)}
        >
          + Add Employee
        </Button>
      </div>
      <Table bordered striped responsive>
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
                  style={{ zIndex: "-1", cursor: "pointer" }}
                  onClick={() => {
                    // navigate("detail", {
                    //   state: rowEl.original,
                    // });
                    setShowViewModal({
                      isShow: true,
                      employee: rowEl.original,
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
                    {/* <button
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
                    </button> */}
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
                            setShowEditModal({
                              show: true,
                              employee: rowEl.original,
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
                              setShowDeactivateModal({
                                isShow: true,
                                employeeId: rowEl.original.id,
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
                                isShow: true,
                                employeeId: rowEl.original.id,
                                action: "Activate",
                              });
                              // setShowDelete(true);
                            }}
                          >
                            <FaUnlock color="green" />
                            Activate
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {employeesData?.length > 0 && (
        <PaginationComponent tableInstance={tableInstance} />
      )}
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
      {showAddCompanyEmployeeModal && (
        <AddCompanyEmployeeModal
          handleClose={setShowAddCompanyEmployeeModal}
          show={showAddCompanyEmployeeModal}
        />
      )}
      {showEditModal.show && showEditModal.employee && (
        <UpdateCompanyEmployeeModal
          show={showEditModal}
          handleClose={setShowEditModal}
          employee={showEditModal.employee}
        />
      )}
      {showDeactivateModal.isShow && (
        <DeactivateEmaployeeModal
          // handleClose={() => setShowDeactivateModal({ isShow: false })}
          handleClose={setShowDeactivateModal}
          show={showDeactivateModal}
          employeeId={showDeactivateModal.employeeId}
          action={showDeactivateModal.action}
        />
      )}
      {showViewModal.isShow && (
        <ViewCompanyEmployeeDetail
          show={showViewModal.isShow}
          handleClose={setShowViewModal}
          employee={showViewModal.employee}
        />
      )}
    </div>
  );
};

export default CompanyEmployee;
