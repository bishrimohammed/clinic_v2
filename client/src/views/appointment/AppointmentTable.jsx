import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import { LuFilter } from "react-icons/lu";

import { TbCalendarCancel } from "react-icons/tb";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useDebounce from "../../hooks/useDebounce";
import { AppointmentColumns } from "./utils/AppointmentColumns";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

import { FaSortDown, FaSortUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { hasPermission } from "../../utils/hasPermission";
import SmartPaginationComponent from "../../components/SmartPaginationComponent";

import {
  fetchAppointments,
  useGetAppointments,
} from "./hooks/useGetAppointments";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import FilterAppointmentModal from "./FilterAppointmentModal";
import { useURLPagination } from "../../hooks/useURLPagination";
import AddAppointmentBtn from "./AddAppointmentBtn";
import ViewAppointmentModal from "./ViewAppointmentModal";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import CancelAppointmantModal from "./CancelAppointmantModal";

const AppointmentTable = (
  {
    // data,
    // isPending,
    // setShowAddAppointmentModal,
    // setShowFilterModal,
    // setFilter,
    // setShowCancleAppointmentModal,
    // setShowUpdateAppointmentModal,
    // setShowDeleteAppointmentModal,
    // setShowViewAppointment,
  }
) => {
  // let [searchParams, setSearchParams] = useSearchParams([{ page: 1 }]);
  const [filter, setFilter] = useState({ status: "" });
  const [showFilterAppointmentModal, setShowFilterAppointmentModal] =
    useState(false);

  // const { paginate, handlePageChange, handleLimitChange, handleSortByChange } =
  //   usePagination({
  //     page: 1,
  //     limit: 10,
  //     sortBy: "appointment_date",
  //     order: "desc",
  //   });
  const {
    page,
    limit,
    order,
    sortBy,
    changePage,
    changePageLimit,
    changePageSortBy,
  } = useURLPagination({
    page: 1,
    limit: 10,
    sortBy: "appointment_date",
    order: "desc",
  });
  const { data, isPending, isPlaceholderData } = useGetAppointments({
    ...filter,
    page: parseInt(page),
    limit: parseInt(limit),
    sortBy,
    order,
  });
  const [search, setSearch] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      const query = {
        ...filter,
        page: parseInt(page) + 1,
        limit: parseInt(limit),
        sortBy,
        order,
      };
      queryClient.prefetchQuery({
        queryKey: ["appointments", query],
        queryFn: () => fetchAppointments(query),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);
  // console.log(appointments);
  const debouncedValue = useDebounce(search, 500);
  const columns = useMemo(() => AppointmentColumns, []);
  const appointments = useMemo(() => data?.results || [], [data?.results]);
  // console.log(appointments);

  const tableInstance = useReactTable({
    columns: columns,
    data: appointments,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: debouncedValue,
    },
    onGlobalFilterChange: setSearch,
  });
  const [showCancleAppointmentModal, setShowCancleAppointmentModal] = useState({
    isShow: false,
    appointmentId: null,
  });
  const [showUpdateAppointmentModal, setShowUpdateAppointmentModal] = useState({
    isShow: false,
    appointment: null,
  });
  const [showViewAppointment, setShowViewAppointment] = useState({
    isShow: false,
    appointment: null,
  });
  const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] = useState({
    isShow: false,
    appointmentId: null,
  });
  // const handlePagination = (page) => {
  //   handlePageChange(page);
  //   // setPagination((prev) => {
  //   //   // console.log(prev);
  //   //   return { ...prev, page: page };
  //   // });
  // };
  // console.log(paginate.sortBy);

  return (
    <>
      <div className=" d-flex flex-wrap  gap-2 align-items-center p-1 w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />

        <Button
          variant="secondary"
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilterAppointmentModal(true)}
        >
          <LuFilter size={16} /> Filter
        </Button>
        <Button variant="warning" onClick={() => setFilter({ status: "" })}>
          Reset
        </Button>
      </div>
      <AddAppointmentBtn />

      <Table
        striped
        bordered
        hover
        responsive
        className="mt-2"
        // style={{ zIndex: 1, overflowY: "hidden" }}
      >
        <thead>
          {/* {tableInstance.getHeaderGroups().map((headerEl) => {
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
          })} */}
          <tr>
            <th>#</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                // handleSortByChange("patient_name");
                changePageSortBy("patient_name");
              }}
            >
              Patient{" "}
              {sortBy == "patient_name" ? (
                order === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null}
            </th>
            <th>Assigned Doctor</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                // handleSortByChange("appointment_date");
                changePageSortBy("appointment_date");
              }}
            >
              Date{" "}
              {sortBy == "appointment_date" ? (
                order === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null}
            </th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
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
          {tableInstance?.getRowModel()?.rows?.map((rowEl, index) => {
            return (
              <tr
                key={rowEl.id}
                style={{ cursor: "pointer", zIndex: "-1" }}
                onClick={() => {
                  // setShowViewEmployee(true);
                  setShowViewAppointment({
                    isShow: true,
                    appointment: rowEl.original,
                  });
                }}
              >
                <td>{(page - 1) * limit + index + 1}</td>
                {rowEl.getVisibleCells().map((cellEl, index) => {
                  return (
                    <>
                      <td key={cellEl.id}>
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext()
                        )}
                      </td>
                    </>
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
                    {/* {(rowEl.original.status === "upcoming") & 7} */}
                    <Dropdown.Menu style={{ zIndex: 55 }}>
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        disabled={rowEl.original.status !== "upcoming"}
                        style={{ zIndex: "50" }}
                        onClick={(event) => {
                          event.stopPropagation();
                          // setData_to_be_Edited(rowEl.original);
                          // handleShowEdit();
                          setShowUpdateAppointmentModal({
                            isShow: true,
                            appointment: rowEl.original,
                          });
                        }}
                      >
                        <RiEditLine /> Edit
                      </Dropdown.Item>

                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        disabled={rowEl.original.status === "cancelled"}
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowCancleAppointmentModal({
                            isShow: true,
                            appointmentId: rowEl.original.id,
                          });
                          // setSelectedEmployee({
                          //   id: rowEl.original.id,
                          //   selectedFor: "deactivate",
                          // });
                          // setShowDelete(true);
                        }}
                      >
                        <TbCalendarCancel color="red" /> Cancel
                      </Dropdown.Item>
                      {hasPermission("Appointment", "delete") && (
                        <Dropdown.Item
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

      <SmartPaginationComponent
        currentPage={parseInt(data?.currentPage) || 1}
        totalPages={parseInt(data?.totalPages) || 1}
        onPageChange={changePage}
        // paginate={paginate}
        // handleLimitChange={handleLimitChange}
      />
      {showFilterAppointmentModal && (
        <FilterAppointmentModal
          show={showFilterAppointmentModal}
          handleClose={() => setShowFilterAppointmentModal(false)}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      {showCancleAppointmentModal.isShow && (
        <CancelAppointmantModal
          show={showCancleAppointmentModal.isShow}
          handleClose={() =>
            setShowCancleAppointmentModal({
              isShow: false,
              appointmentId: null,
            })
          }
          appointmentId={showCancleAppointmentModal.appointmentId}
        />
      )}
      {showUpdateAppointmentModal.isShow && (
        <UpdateAppointmentModal
          show={showUpdateAppointmentModal.isShow}
          handleClose={() =>
            setShowUpdateAppointmentModal({
              isShow: false,
              appointment: null,
            })
          }
          appointment={showUpdateAppointmentModal.appointment}
        />
      )}
      {showDeleteAppointmentModal.isShow && (
        <DeleteAppointmentModal
          show={showDeleteAppointmentModal.isShow}
          handleClose={() =>
            setShowDeleteAppointmentModal({
              isShow: false,
              appointmentId: null,
            })
          }
          appointmentId={showDeleteAppointmentModal.appointmentId}
        />
      )}
      {showViewAppointment.isShow && (
        <ViewAppointmentModal
          show={showViewAppointment.isShow}
          handleClose={() =>
            setShowViewAppointment({
              isShow: false,
              appointment: null,
            })
          }
          appointment={showViewAppointment.appointment}
        />
      )}
    </>
  );
};

export default AppointmentTable;
