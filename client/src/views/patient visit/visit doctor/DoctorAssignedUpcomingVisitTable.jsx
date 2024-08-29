import React, { useMemo, useState } from "react";
import {
  fetchActiveAssignedVisits,
  useGetUpcomingAssignedVisitToDoctor,
} from "../hooks/useGetUpcomingAssignedVisitToDoctor";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UpcomingPatientVisitColumn } from "../utils/UpcomingPatientVisitColumn";
import useDebounce from "../../../hooks/useDebounce";
import { FaRegEye, FaSortDown, FaSortUp } from "react-icons/fa6";
import { RiEditLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import { LuFilter } from "react-icons/lu";
import SearchInput from "../../../components/inputs/SearchInput";
// import PaginationComponent from "../../../components/PaginationComponent";
// import AdmitVisitModal from "./AdmitVisitModal";
import FilterVisitModal from "../FilterVisitModal";
import { useQueryClient } from "@tanstack/react-query";
import SmartPaginationComponent from "../../../components/SmartPaginationComponent";
import { AxiosHeaders } from "../../../api/useAxiosHeaders";

const DoctorAssignedUpcomingVisitTable = () => {
  const [search, setSearch] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  // const [sorting, setSorting] = useState([]);
  // // const preLoadData = usePreL
  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const [filter, setFilter] = useState({
    stage: "",
    status: "",
    vistiType: "",
  });
  let tab = searchParams.get("tab") === "active_visits";
  // console.log("upcommi");
  React.useEffect(() => {
    // console.log(searchParams.get("tab"));
    if (searchParams.get("tab") === "active_visits") {
      setSearchParams((prev) => {
        prev.set("page", 1);
        prev.set("limit", 10);
        prev.set("sortBy", "visit_date");
        prev.set("order", "desc");
        return prev;
      });
    }
  }, [tab]);

  const { data, isPending, isPlaceholderData } =
    useGetUpcomingAssignedVisitToDoctor({
      ...filter,
      page: parseInt(searchParams.get("page")),
      limit: parseInt(searchParams.get("limit")),
      sortBy: searchParams.get("sortBy"),
      order: searchParams.get("order"),
    });
  //   const { data: PatientVisit, isPending } = useGetUpcomingPatientVisit(filter);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  // console.log(data);
  const upcomigPatientVisit = useMemo(() => data?.visits || [], [data]);
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => UpcomingPatientVisitColumn, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: upcomigPatientVisit,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    state: {
      globalFilter: debouncedValue,
      // pagination: pagination,
      // sorting,
    },
    onGlobalFilterChange: setSearch,
  });
  const [showfilterModal, setShowFilterModal] = useState(false);
  // const [showAdmitModal, setShowAdmitModal] = useState({
  //   isShow: false,
  //   patientVisitId: null,
  //   // action: "",
  // });
  // console.log(AxiosHeaders().headers);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      const query = {
        ...filter,
        page: parseInt(searchParams.get("page")) + 1,
        limit: parseInt(searchParams.get("limit")),
        sortBy: searchParams.get("sortBy"),
        order: searchParams.get("order"),
      };
      queryClient.prefetchQuery({
        queryKey: ["UpcomingAssignedVisitToDoctor", query],
        queryFn: () => fetchActiveAssignedVisits(query, AxiosHeaders().headers),
      });
    }
  }, [data, isPlaceholderData, searchParams.get("page"), queryClient]);

  const getSortBy = () => {
    return searchParams.get("sortBy");
  };
  const getSortDirection = () => {
    return searchParams.get("order");
  };
  const handleSort = (sortby) => {
    setSearchParams((prev) => {
      if (searchParams.get("sortBy") !== sortby) {
        prev.set("order", "asc");
        prev.set("sortBy", sortby);
        //  return {...prev, sortBy: sortby, order: searchParams.get("order") === "asc"? "desc" : "asc" }
      } else {
        prev.set("order", searchParams.get("order") === "asc" ? "desc" : "asc");
      }
      return prev;
    });
  };
  const handlePagination = (page) => {
    setSearchParams((prev) => {
      prev.set("page", parseInt(page));

      return prev;
    });
  };
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
        {/* <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl, index) => {
                  return (
                    <th
                      className="text-nowrap"
                      key={columnEl.id}
                      colSpan={columnEl.colSpan}
                    >
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
        </thead> */}
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                <th>Patient Id</th>
                <th
                  onClick={() => {
                    handleSort("patient_name");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Patient
                  {getSortBy() == "patient_name" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
                <th>Doctor</th>
                <th
                  onClick={() => {
                    handleSort("visit_date");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Visit Date
                  {getSortBy() == "visit_date" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
                <th
                  onClick={() => {
                    handleSort("visit_type");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Visit Type{" "}
                  {getSortBy() == "visit_type" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
                <th>Stage</th>
                <th>Status</th>

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
                  className="text-nowrap"
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
                        {rowEl.original.stage === "Waiting for doctor" &&
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

                        {rowEl.original.stage !== "Waiting for doctor" &&
                        rowEl.original.stage !== "Waiting for triage" &&
                        rowEl.original.stage !== "Performing triage" &&
                        rowEl.original.stage !== "Waiting for service fee" ? (
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
                        {rowEl.original.stage === "Performing consultation" &&
                        rowEl.original.stage !== "Waiting for triage" &&
                        rowEl.original.stage !== "Performing triage" &&
                        rowEl.original.stage !== "Waiting for service fee" ? (
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
                        {/* <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          disabled={!rowEl.original.status}
                          style={{ zIndex: "50" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowAdmitModal({
                              isShow: true,
                              patientVisitId: rowEl.original.id,
                            });
                          }}
                        >
                          <RiEditLine /> Admit
                        </Dropdown.Item> */}
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

      {/* {upcomigPatientVisit?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )} */}
      <SmartPaginationComponent
        currentPage={parseInt(data?.currentPage) || 1}
        totalPages={parseInt(data?.totalPages)}
        onPageChange={handlePagination}
      />
      {/* {showAdmitModal.isShow && (
        <AdmitVisitModal
          show={showAdmitModal.isShow}
          handleClose={() => setShowAdmitModal({ isShow: false })}
          visitId={showAdmitModal.patientVisitId}
        />
      )} */}
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
