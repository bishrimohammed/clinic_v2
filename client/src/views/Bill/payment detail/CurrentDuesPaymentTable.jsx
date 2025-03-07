import React, { useMemo, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IndividualPaymentColumn } from "../utils/IndividualPaymentColumn";
import { Button, Dropdown, Spinner, Table, Form } from "react-bootstrap";
// import { TbCalendarCancel } from "react-icons/tb";
// import { RiEditLine } from "react-icons/ri";
// import { GrRevert } from "react-icons/gr";
// import { FaMoneyCheckDollar } from "react-icons/fa6";
// import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import TakePaymentModal from "./TakePaymentModal";
import { useLocation } from "react-router-dom";
import { useGetMedicalBillPayment } from "../hooks/useGetMedicalBillPayment";
import VoidPaymentModal from "./VoidPaymentModal";
import { IoMdArrowRoundBack } from "react-icons/io";
import SearchInput from "../../../components/inputs/SearchInput";
import { LuFilter } from "react-icons/lu";
import FilterPaymentsModal from "./FilterPaymentsModal";
import PaginationComponent from "../../../components/PaginationComponent";
import { useGetPatientVisitById } from "../../patient visit/hooks/useGetPatientVisitById";
import { useGetMedicalBillingById } from "../hooks/useGetMedicalBillingById";
import AddAdvancedPaymentButton from "../AddAdvancedPaymentButton";
import SettleAllPaymentButton from "./SettleAllPaymentButton";
import PaymentsTable from "./PaymentsTable";
import ReturnLeftAmountBtn from "./ReturnLeftAmountBtn";

const CurrentDuesPaymentTable = ({}) => {
  const { state } = useLocation();
  const [filter, setFilter] = useState({ status: "" });
  const { data, isPending } = useGetMedicalBillPayment({
    id: state.id,
    filter,
  });
  const { data: visit } = useGetPatientVisitById(state.visit_id);
  const { data: medicalBilling } = useGetMedicalBillingById(state.id);
  // console.log(state);
  // console.log(medicalBilling);
  // console.log(visit);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTakePaymentModal, setShowTakePaymentModal] = useState({
    isShow: false,
    paymentId: null,
    item: null,
  });
  const [showVoidPaymentModal, setShowVoidPaymentModal] = useState({
    isShow: false,
    paymentId: null,
  });

  //   console.log(state);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const payments = useMemo(() => data || [], [data, isPending]);
  // console.log(payments);
  const outStandingAmount = useMemo(
    () =>
      payments
        ?.filter((p) => p.status === "Unpaid")
        ?.reduce((sum, item) => sum + item.item.price, 0),
    [payments]
  );
  // console.log(outStandingAmount);
  //   const isPending = false;
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  const debouncedValue = useDebounce(search, 500);
  // const employeeData = useMemo(() => Data, []);
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
    <>
      <div className=" d-flex justify-content-between flex-wrap  gap-2 align-items-center p-1 w-100 mb-1 mt-2">
        <div className="d-flex flex-wrap  gap-2 align-items-center">
          <SearchInput searchvalue={search} setSearch={setSearch} />

          <Button
            variant="secondary"
            className="d-flex align-items-center gap-1"
            onClick={() => setShowFilterModal(true)}
          >
            <LuFilter size={16} /> Filter
          </Button>
          <Button variant="warning" onClick={() => setFilter({ status: "" })}>
            Reset
          </Button>
        </div>
        <div>
          {visit?.isAdmitted && (
            <>
              {" "}
              <ReturnLeftAmountBtn medicalBilling={medicalBilling} />
              <AddAdvancedPaymentButton
                billId={medicalBilling?.id}
                patient={state.patient}
                visit_stage={visit?.stage}
                is_advanced_payment_amount_completed={
                  medicalBilling?.is_advanced_payment_amount_completed
                }
                has_advanced_payment={medicalBilling?.has_advanced_payment}
              />
              <SettleAllPaymentButton
                has_advanced_payment={medicalBilling?.has_advanced_payment}
                payments={payments}
                medicalBillingId={medicalBilling?.id}
                billId={medicalBilling?.id}
              />
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end">
        {visit?.isAdmitted && (
          <div className="d-flex align-items-center gap-2">
            <Form.Group>
              <Form.Label className="text-nowrap">Credit Amount:</Form.Label>
              <Form.Control
                type="text"
                value={
                  medicalBilling?.advancedPayments?.length > 0
                    ? medicalBilling?.advancedPayments[0]?.remaining_amount +
                      " Birr"
                    : "0 Birr"
                }
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-nowrap">Out Standing:</Form.Label>
              <Form.Control
                type="text"
                value={outStandingAmount + " birr"}
                disabled
              />
            </Form.Group>
            {/* <Form.Control value={} /> */}
          </div>
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
          {
            !isPending && (
              <PaymentsTable
                tableInstance={tableInstance}
                visit={visit}
                // key={visit?.id}
                patient={state.patient}
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
      {showTakePaymentModal.isShow && (
        <TakePaymentModal
          show={showTakePaymentModal}
          handleClose={() =>
            setShowTakePaymentModal({ isShow: false, paymentId: null })
          }
          paymentId={showTakePaymentModal.paymentId}
          patient={state.patient}
          visit={state.visit}
          item={showTakePaymentModal.item}
        />
      )}
      {showVoidPaymentModal.isShow && (
        <VoidPaymentModal
          show={showVoidPaymentModal.isShow}
          handleClose={() =>
            setShowVoidPaymentModal({
              isShow: false,
              paymentId: null,
            })
          }
          paymentId={showVoidPaymentModal.paymentId}
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
    </>
  );
};

export default CurrentDuesPaymentTable;
