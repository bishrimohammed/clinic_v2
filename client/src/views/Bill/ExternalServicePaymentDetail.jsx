import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMedicalBillPayment } from "./hooks/useGetMedicalBillPayment";
import PaginationComponent from "../../components/PaginationComponent";
import PaymentsTable from "./payment detail/PaymentsTable";
import { Button, Spinner, Table } from "react-bootstrap";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IndividualPaymentColumn } from "./utils/IndividualPaymentColumn";
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "../../components/inputs/SearchInput";
import { LuFilter } from "react-icons/lu";
import FilterPaymentsModal from "./payment detail/FilterPaymentsModal";
import { IoMdArrowRoundBack } from "react-icons/io";

const ExternalServicePaymentDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState({ status: "" });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { data, isPending } = useGetMedicalBillPayment({
    id: state.id,
    filter,
  });
  const payments = useMemo(() => data || [], [data, isPending]);
  //   console.log(state);
  const debouncedValue = useDebounce(search, 500);
  const columns = useMemo(() => IndividualPaymentColumn, []);
  const tableInstance = useReactTable({
    columns: columns,
    data: payments,
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
    <div>
      {" "}
      <div className=" d-flex border-bottom p-2 mb-3 gap-3 align-items-center mb-1">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h4 className="mb-0">View Patient Payment Details</h4>
      </div>
      <div className="d-flex align-items-center mb-3">
        <h6 className="mb-0">Patient Name: </h6>
        <p className="mb-0 ms-2">{state.externalService.patient_name}</p>
      </div>
      <div className="d-flex flex-wrap  gap-2 align-items-center">
        <SearchInput searchvalue={search} setSearch={setSearch} />

        <Button
          variant="secondary"
          size="sm"
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilterModal(true)}
        >
          <LuFilter size={16} /> Filter
        </Button>
        <Button
          size="sm"
          variant="warning"
          onClick={() => setFilter({ status: "" })}
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
          {
            !isPending && (
              <PaymentsTable
                tableInstance={tableInstance}
                visit={null}
                patient={null}
                externalService={state?.externalService}
              />
            )
            // tableInstance.getRowModel().rows.map((rowEl) => {
            //   return (
            //     <tr
            //       key={rowEl.id}
            //       style={{ cursor: "pointer", zIndex: "-1" }}
            //     >
            //       {rowEl.getVisibleCells().map((cellEl, index) => {
            //         return (
            //           <td key={cellEl.id}>
            //             {flexRender(
            //               cellEl.column.columnDef.cell,
            //               cellEl.getContext()
            //             )}
            //           </td>
            //         );
            //       })}
            //       <td
            //         className="p-0"
            //         onClick={(e) => e.stopPropagation()}
            //         style={
            //           {
            //             // zIndex: 8,
            //             // overflow: "hidden",
            //           }
            //         }
            //       >
            //         <Dropdown
            //           id={rowEl.original.id + "dropdown"}
            //           autoClose="outside"
            //           drop="centered"
            //           as="div"
            //           //
            //           // show={openDropdowns[rowEl.original.id]}
            //           onToggle={(event) => handleToggleDropdown(null, event)}
            //           show={openDropdownIndex === rowEl.original.id}
            //         >
            //           <Dropdown.Toggle
            //             caret="false"
            //             className="employee-dropdown px-3 border-0"
            //             style={{ backgroundColor: "transparent" }}
            //             // style={{ zIndex: 6 }}
            //             id={`dropdown-${rowEl.original.id}`}
            //             onClick={(event) =>
            //               handleToggleDropdown(rowEl.original.id, event)
            //             }
            //           >
            //             <span
            //               // style={{ color: "red", zIndex: -1 }}
            //               className="text-dark"
            //             >
            //               <BsThreeDotsVertical />
            //             </span>
            //           </Dropdown.Toggle>

            //           <Dropdown.Menu style={{ zIndex: 55 }}>
            //             <Dropdown.Item
            //               className="d-flex gap-2 align-items-center"
            //               role="button"
            //               disabled={rowEl.original.status !== "Unpaid"}
            //               style={{ zIndex: "50" }}
            //               onClick={(event) => {
            //                 event.stopPropagation();
            //                 // setData_to_be_Edited(rowEl.original);
            //                 // handleShowEdit();
            //                 setShowTakePaymentModal({
            //                   isShow: true,
            //                   paymentId: rowEl.original.id,
            //                   item: rowEl.original.item,
            //                 });
            //               }}
            //             >
            //               <FaMoneyCheckDollar color="green" /> Take Payment
            //             </Dropdown.Item>

            //             <Dropdown.Item
            //               className="d-flex gap-2 align-items-center"
            //               role="button"
            //               disabled={
            //                 rowEl.original.status === "Unpaid" ||
            //                 rowEl.original.status === "Void"
            //               }
            //               onClick={(event) => {
            //                 event.stopPropagation();
            //                 setShowVoidPaymentModal({
            //                   isShow: true,
            //                   paymentId: rowEl.original.id,
            //                 });
            //                 // setSelectedEmployee({
            //                 //   id: rowEl.original.id,
            //                 //   selectedFor: "deactivate",
            //                 // });
            //                 // setShowDelete(true);
            //               }}
            //             >
            //               <FcCancel /> Void
            //             </Dropdown.Item>
            //           </Dropdown.Menu>
            //         </Dropdown>
            //       </td>
            //     </tr>
            //   );
            // })
          }
        </tbody>
      </Table>
      {data?.length > 0 && (
        <PaginationComponent
          tableInstance={tableInstance}
          // setShowTakePaymentModal={setShowTakePaymentModal}
        />
      )}
      {showFilterModal && (
        <FilterPaymentsModal
          show={showFilterModal}
          handleClose={() => setShowFilterModal(false)}
          setFilter={setFilter}
          filter={filter}
        />
      )}
    </div>
  );
};

export default ExternalServicePaymentDetail;
