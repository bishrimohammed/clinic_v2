import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { CgLockUnlock } from "react-icons/cg";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaUserLock } from "react-icons/fa";

import { RiEditLine } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { patientColumns } from "./utils/PatientColumn";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import SearchInput from "../../components/inputs/SearchInput";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { hasPermission } from "../../utils/hasPermission";
// import PaginationComponent from "../../components/PaginationComponent";
const PatientTable = ({
  isPending,
  patients,
  setShowViewPatient,
  setShowFilterModal,
  setShowDeactivateModal,
  setFilter,
}) => {
  //   console.log("jkjhg");
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("page"));
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };

  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
  const columns = useMemo(() => patientColumns, []);

  const tableInstance = useReactTable({
    columns: columns,
    data: patients,

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
    // defaultSortColumn: "Name", // Set the default sort column
    // defaultSortDirection: "asc",
  });
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
  // console.log(getSortBy());
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
          onClick={() =>
            setFilter({ is_new: "", is_credit: "", gender: "", status: "" })
          }
        >
          Reset
        </Button>
      </div>
      <div className="d-flex justify-content-between gap-2 align-items-center w-100 mb-1 mt-2">
        {hasPermission("patient", "create") && (
          <Link to="/patients/newpatient" className="btn btn-primary ms-auto">
            + Add Patient
          </Link>
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
                          {
                            {
                              asc: <FaSortUp />,
                              desc: <FaSortDown />,
                            }[columnEl.column.getIsSorted()]
                          }
                          
                        </div>
                      )}
                    </th>
                  );
                })} */}
                <th>Patient Id</th>
                <th
                  onClick={() => {
                    handleSort("name");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Name{" "}
                  {getSortBy() == "name" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
                <th
                  className="cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSort("sex");
                  }}
                >
                  Sex
                  {getSortBy() == "sex" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
                <th
                // onClick={() => {
                //   handleSort("phone");
                // }}
                >
                  Phone
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSort("registation_date");
                  }}
                >
                  Registation Date{" "}
                  {getSortBy() == "registation_date" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSort("age");
                  }}
                >
                  Age{" "}
                  {getSortBy() == "age" ? (
                    getSortDirection() === "asc" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : null}
                </th>
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
          {!isPending &&
            tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                <tr
                  key={rowEl.id}
                  style={{ cursor: "pointer", zIndex: "-1" }}
                  onClick={() => {
                    setShowViewPatient({
                      isShow: true,
                      patient: rowEl.original,
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
                            // setData_to_be_Edited(rowEl.original);
                            // handleShowEdit();
                            navigate("editpatient", { state: rowEl.original });
                          }}
                        >
                          <RiEditLine /> Edit
                        </Dropdown.Item>
                        {rowEl.original.status ? (
                          <Dropdown.Item
                            className="d-flex gap-2 align-items-center"
                            role="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setShowDeactivateModal({
                                isShow: true,
                                patientId: rowEl.original.id,
                                action: "Deactivate",
                              });
                              // setSelectedEmployee({
                              //   id: rowEl.original.id,
                              //   selectedFor: "deactivate",
                              // });
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
                                patientId: rowEl.original.id,
                                action: "Activate",
                              });
                            }}
                          >
                            <CgLockUnlock /> Activate
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
      {/* {patients?.length > 0 && !isPending && (
        <PaginationComponent tableInstance={tableInstance} />
      )} */}
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
    </>
  );
};

export default PatientTable;
