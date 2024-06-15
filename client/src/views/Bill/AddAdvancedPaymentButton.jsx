import React, { useState } from "react";
import AddAdvancedPayment from "./AddAdvancedPayment";

const AddAdvancedPaymentButton = ({
  billId,
  patient,
  visit_stage,
  is_advanced_payment_amount_completed,
}) => {
  console.log(visit_stage);
  const [showAddAdvancedPaymentModal, setShowAddAdvancedPaymentModal] =
    useState(false);
  return (
    <>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => setShowAddAdvancedPaymentModal(true)}
        disabled={!is_advanced_payment_amount_completed}
      >
        Add Advanced Payment
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
