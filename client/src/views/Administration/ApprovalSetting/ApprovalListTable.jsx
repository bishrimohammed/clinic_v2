import React, { useMemo } from "react";
import { Button, Container, Dropdown, Spinner, Table } from "react-bootstrap";
import useDebounce from "../../../hooks/useDebounce";
import SearchInput from "../../../components/inputs/SearchInput";
import { LuFilter } from "react-icons/lu";
import AddApprovalSettingButton from "./AddApprovalSettingButton";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ApprovalTableHeader } from "./utils/ApprovalTableHeader";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { CgLockUnlock } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import PaginationComponent from "../../../components/PaginationComponent";
import { TbCalendarCancel } from "react-icons/tb";
import { hasPermission } from "../../../utils/hasPermission";
import UpdateApprovalSettingModal from "./UpdateApprovalSettingModal";
import ActivateDeactivateApprovalModal from "./ActivateDeactivateApprovalModal";

const ApprovalListTable = ({
  approval_settings,
  isPending,
  filter,
  setFilter,
  showFilterModal,
  setShowFilterModal,
}) => {
  const [search, setSearch] = React.useState("");
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showUpdateModal, setShowUpdateModal] = React.useState({
    isShow: false,
    approval_setting: null,
  });
  const [showActivateModal, setShowActivateModal] = React.useState({
    isShow: false,
    approvalSettingId: null,
    action: "",
  });
  const [openDropdownIndex, setOpenDropdownIndex] = React.useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };

  const debouncedValue = useDebounce(search, 500);
  const columns = useMemo(() => ApprovalTableHeader, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: approval_settings,
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
    <Container className="p-3">
      <div className=" border-bottom border-1 mb-1">
        {/* <h4 className="mb-2">View Employees</h4> */}
        <h4 className=" p-2 mb-0 fw-bold">Approval Setting</h4>
      </div>
      <div className=" d-flex flex-wrap  gap-2 align-items-center p-1 pb-0 w-100 mb-1 mt-2">
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
          onClick={() => setFilter({ status: "", approval_level: "" })}
        >
          Reset
        </Button>
      </div>
      <div className="d-flex justify-content-between gap-2 align-items-center w-100 mb-2 mt-2">
        <AddApprovalSettingButton />
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
                    setShowViewEmployee(true);
                    setEmployee(rowEl.original);
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
                          disabled={!rowEl.original.status}
                          style={{ zIndex: "50" }}
                          onClick={(event) => {
                            event.stopPropagation();
                            // setData_to_be_Edited(rowEl.original);
                            // handleShowEdit();
                            setShowUpdateModal({
                              isShow: true,
                              approval_setting: rowEl.original,
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
                            setShowActivateModal({
                              isShow: true,
                              approvalSettingId: rowEl.original.id,
                              action: "Deactivate",
                            });
                            // setSelectedEmployee({
                            //   id: rowEl.original.id,
                            //   selectedFor: "deactivate",
                            // });
                            // setShowDelete(true);
                          }}
                        >
                          <TbCalendarCancel color="red" /> Deactivate
                        </Dropdown.Item>
                        {hasPermission("Appointment", "create") && (
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

      {!isPending && <PaginationComponent tableInstance={tableInstance} />}
      {showUpdateModal.isShow && (
        <UpdateApprovalSettingModal
          show={showUpdateModal.isShow}
          handleClose={() =>
            setShowUpdateModal({ isShow: false, approval_setting: null })
          }
          approvalSetting={showUpdateModal.approval_setting}
        />
      )}
      {showActivateModal.isShow && (
        <ActivateDeactivateApprovalModal
          show={showActivateModal.isShow}
          handleClose={() =>
            setShowActivateModal({
              isShow: false,
              appointmentId: null,
              action: "",
            })
          }
          appointmentId={showActivateModal.appointmentId}
          action={showActivateModal.action}
        />
      )}
    </Container>
  );
};

export default ApprovalListTable;
