import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import TakePaymentModal from "./TakePaymentModal";
import VoidPaymentModal from "./VoidPaymentModal";

const PaymentsTable = ({ tableInstance, visit, patient, externalService }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState({});
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  const [showTakePaymentModal, setShowTakePaymentModal] = useState({
    isShow: false,
    paymentId: null,
    item: null,
  });
  const [showVoidPaymentModal, setShowVoidPaymentModal] = useState({
    isShow: false,
    paymentId: null,
  });
  return tableInstance.getRowModel().rows.map((rowEl) => {
    return (
      <>
        <tr key={rowEl.id} style={{ cursor: "pointer", zIndex: "-1" }}>
          {rowEl.getVisibleCells().map((cellEl, index) => {
            return (
              <td key={cellEl.id}>
                {flexRender(cellEl.column.columnDef.cell, cellEl.getContext())}
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
                  disabled={rowEl.original.status !== "Unpaid"}
                  style={{ zIndex: "50" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    // setData_to_be_Edited(rowEl.original);
                    // handleShowEdit();
                    setShowTakePaymentModal({
                      isShow: true,
                      paymentId: rowEl.original.id,
                      item: rowEl.original.item,
                    });
                  }}
                >
                  <FaMoneyCheckDollar color="green" /> Take Payment
                </Dropdown.Item>

                <Dropdown.Item
                  className="d-flex gap-2 align-items-center"
                  role="button"
                  disabled={
                    rowEl.original.status === "Unpaid" ||
                    rowEl.original.status === "Void"
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowVoidPaymentModal({
                      isShow: true,
                      paymentId: rowEl.original.id,
                    });
                    // setSelectedEmployee({
                    //   id: rowEl.original.id,
                    //   selectedFor: "deactivate",
                    // });
                    // setShowDelete(true);
                  }}
                >
                  <FcCancel /> Void
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>

        {showTakePaymentModal.isShow && (
          <TakePaymentModal
            show={showTakePaymentModal}
            handleClose={() =>
              setShowTakePaymentModal({ isShow: false, paymentId: null })
            }
            paymentId={showTakePaymentModal.paymentId}
            patient={patient}
            visit={visit}
            item={showTakePaymentModal.item}
            externalService={externalService}
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
      </>
    );
  });
};

export default PaymentsTable;
