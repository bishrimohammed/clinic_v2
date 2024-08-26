import React, { useMemo, useState } from "react";
import { LuFilter } from "react-icons/lu";
import SearchInput from "../../components/inputs/SearchInput";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useDebounce from "../../hooks/useDebounce";
import { PatientVisitColumn } from "./utils/PatientVisitColumn";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { TbCalendarCancel } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
// import { hasPermission } from "../../utils/hasPermission";
import PaginationComponent from "../../components/PaginationComponent";
import {
  fetchAllVisits,
  useGetPatientVisits,
} from "./hooks/useGetPatientVisits";
import FilterVisitModal from "./FilterVisitModal";
import CancelPatientVisitModal from "./CancelPatientVisitModal";
import TransferPatientVisitModal from "./TransferPatientVisitModal";
import { useSearchParams } from "react-router-dom";
import SmartPaginationComponent from "../../components/SmartPaginationComponent";
import { useQueryClient } from "@tanstack/react-query";

const PatientVisitTable = (
  {
    // patientVisits,
    // isPending,
    // setShowAddPatientVisitModal,
    // setShowFilterModal,
    // setFilter,
    // setShowCancelPatientVisitModal,
    // setShowTransferredPatientVisitModal,
  }
) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    stage: "",
    status: "",
    vistiType: "",
  });
  let tab = searchParams.get("tab") === "all_visits";
  // const [showAddPatientVisitModal, setShowAddPatientVisitModal] =
  //   useState(false);
  const [showFilterVisitModal, setShowFilterVisitModal] = useState(false);
  const [showCancelPatientVisitModal, setShowCancelPatientVisitModal] =
    useState({
      isShow: false,
      visitId: null,
    });
  const [
    showTransferredPatientVisitModal,
    setShowTransferredPatientVisitModal,
  ] = useState({
    isShow: false,
    visit: null,
  });
  React.useEffect(() => {
    // console.log(searchParams.get("tab"));
    if (searchParams.get("tab") === "all_visits") {
      setSearchParams((prev) => {
        prev.set("page", 1);
        prev.set("limit", 10);
        prev.set("sortBy", "visit_date");
        prev.set("order", "desc");
        return prev;
        // page: 1,
        // limit: 2,
        // sortBy: "visit_date",
        // order: "asc",
      });
    }
  }, [tab]);
  const { data, isPending, isPlaceholderData } = useGetPatientVisits({
    ...filter,
    page: parseInt(searchParams.get("page")),
    limit: parseInt(searchParams.get("limit")),
    sortBy: searchParams.get("sortBy"),
    order: searchParams.get("order"),
  });
  // const { data, isPending } = useGetPatientVisits(filter);
  const [search, setSearch] = useState("");
  // const [sorting, setSorting] = useState([]);
  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => PatientVisitColumn, []);
  const patientVisits = useMemo(() => data?.visits || [], [data]);
  const tableInstance = useReactTable({
    columns: columns,
    data: patientVisits,
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
    // onGlobalFilterChange: setSearch,
  });
  const handlePagination = (page) => {
    setSearchParams((prev) => {
      prev.set("page", parseInt(page));

      return prev;
    });
  };
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
        queryKey: ["patient visits", query],
        queryFn: () => fetchAllVisits(query),
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
  return (
    <>
      <div className=" d-flex flex-wrap  gap-2 align-items-center p-1 w-100 mb-1 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />

        <Button
          variant="secondary"
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilterVisitModal(true)}
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
                {/* {headerEl.headers.map((columnEl, index) => {
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
                })} */}
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
          {!isPending && patientVisits?.length === 0 && (
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
                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          disabled={!rowEl.original.status}
                          style={{ zIndex: "50" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            // setData_to_be_Edited(rowEl.original);
                            // handleShowEdit();
                            setShowTransferredPatientVisitModal({
                              isShow: true,
                              visit: rowEl.original,
                            });
                          }}
                        >
                          <RiEditLine /> Transfer
                        </Dropdown.Item>

                        <Dropdown.Item
                          className="d-flex gap-2 align-items-center"
                          role="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowCancelPatientVisitModal({
                              isShow: true,
                              visitId: rowEl.original.id,
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
      {/* {patientVisits?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )} */}
      <SmartPaginationComponent
        currentPage={parseInt(data?.currentPage) || 1}
        totalPages={parseInt(data?.totalPages)}
        onPageChange={handlePagination}
      />
      {showFilterVisitModal && (
        <FilterVisitModal
          show={showFilterVisitModal}
          handleClose={() => setShowFilterVisitModal(false)}
          setFilter={setFilter}
        />
      )}
      {showCancelPatientVisitModal.isShow && (
        <CancelPatientVisitModal
          show={showCancelPatientVisitModal.isShow}
          handleClose={() =>
            setShowCancelPatientVisitModal({ isShow: false, visitId: null })
          }
          visitId={showCancelPatientVisitModal.visitId}
        />
      )}
      {showTransferredPatientVisitModal.isShow && (
        <TransferPatientVisitModal
          show={showTransferredPatientVisitModal.isShow}
          handleClose={() =>
            setShowTransferredPatientVisitModal({
              isShow: false,
              visit: null,
            })
          }
          visit={showTransferredPatientVisitModal.visit}
        />
      )}
    </>
  );
};

export default PatientVisitTable;
