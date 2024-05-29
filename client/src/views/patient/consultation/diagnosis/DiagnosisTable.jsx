import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { diagnosisColumn } from "./diagnosisColumn";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { TbCalendarCancel } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, Spinner, Table } from "react-bootstrap";
import { FaPlusCircle, FaSortDown, FaSortUp } from "react-icons/fa";
import ConfirmDiagnosisModal from "./ConfirmDiagnosisModal";
import SearchInput from "../../../../components/inputs/SearchInput";
import AddDiagnosisModal from "./AddDiagnosisModal";

const DiagnosisTable = ({ diagnosis }) => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  // console.log(appointments);
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => diagnosisColumn, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: diagnosis,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,
    state: {
      globalFilter: debouncedValue,

      sorting,
    },
    onGlobalFilterChange: setSearch,
  });
  const [showConfirmDiagnosisModal, setShowConfirmDiagnosisModal] = useState({
    isShow: false,
    diagnosisId: null,
    action: "",
  });
  const [showAddDiagnosisModal, setShowAddDiagnosisModal] =
    React.useState(false);
  return (
    <div>
      <div className=" d-flex flex-wrap justify-content-between  gap-2 align-items-center p-1 w-100 mb-2 mt-2">
        <SearchInput searchvalue={search} setSearch={setSearch} />
        <button
          onClick={() => setShowAddDiagnosisModal(true)}
          className="border-0 bg-transparent d-flex align-self-end justify-content-end gap-2 "
        >
          <FaPlusCircle size={20} className="text-primary" />
        </button>
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
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id} style={{ cursor: "pointer", zIndex: "-1" }}>
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
                <td className="p-0" onClick={(e) => e.stopPropagation()}>
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
                        disabled={rowEl.original.status !== "Suspected"}
                        style={{ zIndex: "50" }}
                        onClick={(event) => {
                          event.stopPropagation();
                          // setData_to_be_Edited(rowEl.original);
                          // handleShowEdit();
                          setShowConfirmDiagnosisModal({
                            isShow: true,
                            diagnosisId: rowEl.original.id,
                            action: "Confirm",
                          });
                        }}
                      >
                        <RiEditLine /> Confirm
                      </Dropdown.Item>

                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        disabled={rowEl.original.status !== "Suspected"}
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowConfirmDiagnosisModal({
                            isShow: true,
                            diagnosisId: rowEl.original.id,
                            action: "Rule Out",
                          });
                        }}
                      >
                        <TbCalendarCancel color="red" /> Rule Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showConfirmDiagnosisModal.isShow && (
        <ConfirmDiagnosisModal
          show={showConfirmDiagnosisModal.isShow}
          handleClose={() =>
            setShowConfirmDiagnosisModal({
              isShow: false,
              diagnosisId: null,
              action: "",
            })
          }
          diagnosisId={showConfirmDiagnosisModal.diagnosisId}
          action={showConfirmDiagnosisModal.action}
        />
      )}
      {showAddDiagnosisModal && (
        <AddDiagnosisModal
          handelClose={() => setShowAddDiagnosisModal(false)}
          show={showAddDiagnosisModal}
        />
      )}
    </div>
  );
};

export default DiagnosisTable;
