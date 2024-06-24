import React, { useMemo, useState } from "react";
import { useGetUpcomingAssignedVisitToDoctor } from "../hooks/useGetUpcomingAssignedVisitToDoctor";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UpcomingPatientVisitColumn } from "../utils/UpcomingPatientVisitColumn";
import useDebounce from "../../../hooks/useDebounce";
import { FaRegEye, FaSortDown, FaSortUp } from "react-icons/fa6";
import { RiEditLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Dropdown, Modal, Spinner, Table } from "react-bootstrap";
import { LuFilter } from "react-icons/lu";
import SearchInput from "../../../components/inputs/SearchInput";
import PaginationComponent from "../../../components/PaginationComponent";
import AdmitVisitModal from "./AdmitVisitModal";
import FilterVisitModal from "../FilterVisitModal";

const DoctorAssignedUpcomingVisitTable = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  // const preLoadData = usePreL
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState({
    stage: "",
    status: "",
    vistiType: "",
  });
  const { data: PatientVisit, isPending } =
    useGetUpcomingAssignedVisitToDoctor(filter);
  //   const { data: PatientVisit, isPending } = useGetUpcomingPatientVisit(filter);
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
  const [showAdmitModal, setShowAdmitModal] = useState({
    isShow: false,
    patientVisitId: null,
    // action: "",
  });
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
          {!isPending && upcomigPatientVisit?.length === 0 && (
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
                    // setShowViewEmployee(true);
                    // setShowViewAppointment({
                    //   isShow: true,
                    //   appointment: rowEl.original,
                    // });
                    // navigate("view", { state: rowEl.original });
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
                        {rowEl.original.stage === "Waiting for examiner" &&
                        rowEl.original.stage !== "Admitted" ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            disabled={!rowEl.original.status}
                            style={{ zIndex: "50" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              // setData_to_be_Edited(rowEl.original);
                              // handleShowEdit();
                              navigate(
                                `/patients/history/${rowEl.original.medicalRecord_id}`,
                                {
                                  state: rowEl.original,
                                }
                              );
                            }}
                          >
                            <RiEditLine /> Start Consultation
                          </Dropdown.Item>
                        ) : null}
                        {/* {rowEl.original.stage !== "Waiting for examiner" &&
                        rowEl.original.stage !== "Admitted" ? ( */}
                        {rowEl.original.stage !== "Waiting for examiner" ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            disabled={!rowEl.original.status}
                            style={{ zIndex: "50" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              // setData_to_be_Edited(rowEl.original);
                              // handleShowEdit();
                              navigate(
                                `/patients/history/${rowEl.original.medicalRecord_id}`,
                                {
                                  state: rowEl.original,
                                }
                              );
                            }}
                          >
                            <RiEditLine /> Continue Consultation
                          </Dropdown.Item>
                        ) : null}
                        {rowEl.original.stage === "Performing consultation" ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            disabled={!rowEl.original.status}
                            style={{ zIndex: "50" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              // setData_to_be_Edited(rowEl.original);
                              // handleShowEdit();
                            }}
                          >
                            <RiEditLine /> Finish Consultation
                          </Dropdown.Item>
                        ) : null}
                        {/* {rowEl.original.stage === "Performing consultation" ? ( */}
                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          disabled={!rowEl.original.status}
                          style={{ zIndex: "50" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            // setData_to_be_Edited(rowEl.original);
                            // handleShowEdit();
                            setShowAdmitModal({
                              isShow: true,
                              patientVisitId: rowEl.original.id,
                              // action: "Finish",
                            });
                          }}
                        >
                          <RiEditLine /> Admit
                        </Dropdown.Item>
                        {/* ) : null} */}
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

      {upcomigPatientVisit?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )}

      {showAdmitModal.isShow && (
        <AdmitVisitModal
          show={showAdmitModal.isShow}
          handleClose={() => setShowAdmitModal({ isShow: false })}
          visitId={showAdmitModal.patientVisitId}
        />
      )}
      {showfilterModal && (
        <FilterVisitModal
          show={showfilterModal}
          handleClose={() => setShowFilterModal(false)}
          setFilter={setFilter}
          filter={filter}
        />
      )}
    </>
  );
};

export default DoctorAssignedUpcomingVisitTable;
