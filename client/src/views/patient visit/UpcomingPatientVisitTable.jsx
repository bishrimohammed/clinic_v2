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
import { UpcomingPatientVisitColumn } from "./utils/UpcomingPatientVisitColumn";
import { useGetUpcomingPatientVisit } from "./hooks/useGetUpcomingPatientVisit";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import { RiEditLine } from "react-icons/ri";
import { MdOutlinePreview } from "react-icons/md";
import { TbCalendarCancel } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import SearchInput from "../../components/inputs/SearchInput";
import FilterUpcomingVisitModal from "./upcoming/FilterUpcomingVisitModal";
import ConfirmTraigeModal from "./upcoming/ConfirmTraigeModal";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../utils/hasPermission";
import AddPatientVisitModal from "./AddPatientVisitModal";
import PaginationComponent from "../../components/PaginationComponent";
import { useStartTraige } from "./hooks/useStartTraige";

const UpcomingPatientVisitTable = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState({
    stage: "",
    status: "",
    vistiType: "",
  });
  const startTraige = useStartTraige();
  const {
    data: PatientVisit,
    isPending,
    isSuccess,
  } = useGetUpcomingPatientVisit(filter);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  const upcomigPatientVisit = useMemo(() => PatientVisit || [], [PatientVisit]);
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => UpcomingPatientVisitColumn, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: upcomigPatientVisit,
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
  const [showfilterModal, setShowFilterModal] = useState(false);
  const [showConfirmTraigeModal, setShowConfirmTraigeModal] = useState({
    isShow: false,
    patientVisitId: null,
    action: "",
  });
  const [showAddPatientVisitModal, setShowAddPatientVisitModal] =
    useState(false);
  const navigate = useNavigate();
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
      <div className="d-flex justify-content-between gap-2 align-items-center w-100 mb-1 mt-2">
        {hasPermission("visit", "create") && (
          <Button
            className="btn btn-primary ms-auto"
            onClick={() => setShowAddPatientVisitModal(true)}
          >
            +Add Visit
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
          {!isPending && upcomigPatientVisit.length === 0 && (
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
                  // style={{ cursor: "pointer", zIndex: "-1" }}
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
                    >
                      <Dropdown.Toggle
                        caret="false"
                        className="employee-dropdown px-3 border-0"
                        style={{ backgroundColor: "transparent" }}
                        // style={{ zIndex: 6 }}
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

                      <Dropdown.Menu style={{ zIndex: 55 }}>
                        {rowEl.original.stage === "Waiting for triage" ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            disabled={!rowEl.original.status}
                            style={{ zIndex: "50" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              // setData_to_be_Edited(rowEl.original);
                              // handleShowEdit();
                              // setShowConfirmTraigeModal({
                              //   isShow: true,
                              //   patientVisitId: rowEl.original.id,
                              //   action: "Start",
                              // });
                              startTraige.mutateAsync(rowEl.original.id);
                              hasPermission("triage", "create") &&
                                (rowEl.original.stage ===
                                  "Waiting for triage" ||
                                  rowEl.original.stage ===
                                    "Performing triage") &&
                                navigate("view", { state: rowEl.original });
                            }}
                          >
                            <RiEditLine /> Start Triage
                          </Dropdown.Item>
                        ) : null}

                        {rowEl.original.stage === "Performing triage" ? (
                          <>
                            <Dropdown.Item
                              className="d-flex gap-2 align-items-center"
                              role="button"
                              disabled={!rowEl.original.status}
                              style={{ zIndex: "50" }}
                              onClick={(event) => {
                                event.stopPropagation();
                                // setData_to_be_Edited(rowEl.original);
                                // handleShowEdit();
                                // setShowConfirmTraigeModal({
                                //   isShow: true,
                                //   patientVisitId: rowEl.original.id,
                                //   action: "Start",
                                // });
                                hasPermission("triage", "create") &&
                                  (rowEl.original.stage ===
                                    "Waiting for triage" ||
                                    rowEl.original.stage ===
                                      "Performing triage") &&
                                  navigate("view", { state: rowEl.original });
                              }}
                            >
                              <RiEditLine /> Continue Triage
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="d-flex gap-2 align-items-center"
                              role="button"
                              disabled={!rowEl.original.status}
                              style={{ zIndex: "50" }}
                              onClick={(event) => {
                                event.stopPropagation();
                                // setData_to_be_Edited(rowEl.original);
                                // handleShowEdit();
                                setShowConfirmTraigeModal({
                                  isShow: true,
                                  patientVisitId: rowEl.original.id,
                                  action: "Finish",
                                });
                              }}
                            >
                              <RiEditLine /> Finish Triage
                            </Dropdown.Item>
                          </>
                        ) : null}
                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            // setShowCancelPatientVisitModal({
                            //   isShow: true,
                            //   visitId: rowEl.original.id,
                            // });
                            // setSelectedEmployee({
                            //   id: rowEl.original.id,
                            //   selectedFor: "deactivate",
                            // });
                            // setShowDelete(true);
                            navigate(
                              "/patients/view/" + rowEl.original.patient_id
                            );
                          }}
                        >
                          <FaRegEye /> View
                        </Dropdown.Item>

                        {/* <Dropdown.Item
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowDeleteAppointmentModal({
                              isShow: true,
                              appointmentId: rowEl.original.id,
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
      {
        upcomigPatientVisit.length > 0 && !isPending && (
          <PaginationComponent tableInstance={tableInstance} />
        )
        // : (
        //   <div className="d-flex ">
        //     <span className="text-danger fw-bold">No Active Visit</span>
        //   </div>
        // )
      }
      {/* <div
        style={{ zIndex: 0 }}
        className="d-flex flex-wrap justify-content-center mt-md-1 mt-2 align-items-center gap-2"
      >
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
      {showfilterModal && (
        <FilterUpcomingVisitModal
          show={showfilterModal}
          handleClose={setShowFilterModal}
          setFilter={setFilter}
        />
      )}
      {showConfirmTraigeModal.isShow && (
        <ConfirmTraigeModal
          show={showConfirmTraigeModal.isShow}
          handleClose={() =>
            setShowConfirmTraigeModal({
              isShow: false,
              patientVisitId: null,
              action: null,
            })
          }
          visitId={showConfirmTraigeModal.patientVisitId}
          action={showConfirmTraigeModal.action}
        />
      )}
      {showAddPatientVisitModal && (
        <AddPatientVisitModal
          show={showAddPatientVisitModal}
          handleClose={() => setShowAddPatientVisitModal(false)}
        />
      )}
    </>
  );
};

export default UpcomingPatientVisitTable;
