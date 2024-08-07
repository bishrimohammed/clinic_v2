import React, { useState } from "react";
import AddAdvancedPayment from "./AddAdvancedPayment";

const AddAdvancedPaymentButton = ({
  billId,
  patient,
  visit_stage,
  is_advanced_payment_amount_completed,
  has_advanced_payment,
}) => {
  // console.log(has_advanced_payment);
  // console.log(is_advanced_payment_amount_completed);
  const [showAddAdvancedPaymentModal, setShowAddAdvancedPaymentModal] =
    useState(false);
  return (
    <>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => setShowAddAdvancedPaymentModal(true)}
        disabled={
          has_advanced_payment
            ? !is_advanced_payment_amount_completed
            : is_advanced_payment_amount_completed
          // is_advanced_payment_amount_completed
        }
      >
        Process Advance
      </button>
      {showAddAdvancedPaymentModal && (
        <AddAdvancedPayment
          show={showAddAdvancedPaymentModal}
          handleClose={() => setShowAddAdvancedPaymentModal(false)}
          billId={billId}
          patient={patient}
        />
      )}
    </>
  );
};

export default AddAdvancedPaymentButton;
