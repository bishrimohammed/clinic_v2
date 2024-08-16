import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useReturnRemainingAmount } from "../hooks/useReturnRemainingAmount";

const ReturnLeftAmountBtn = ({ medicalBilling }) => {
  const { state } = useLocation();
  const [showConfirmModal, setShowconfirmModal] = useState(false);
  const { mutateAsync, isPending } = useReturnRemainingAmount();
  console.log(state);
  return (
    <>
      <Button
        size="sm"
        className="me-2"
        onClick={() => setShowconfirmModal(true)}
        disabled={
          !(
            state.visit.stage === "Done" &&
            !state.is_advanced_payment_amount_completed
          )
        }
      >
        Return Left Amount
      </Button>
      <Modal show={showConfirmModal} onHide={() => setShowconfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Return Left Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Are you sure you want to return the left amount?
          </Form.Label>

          <Form.Control
            value={`${medicalBilling?.advancedPayments[0]?.remaining_amount} Birr`}
            disabled={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowconfirmModal(false)}
          >
            Close
          </Button>
          <Button
            disabled={isPending}
            variant="primary"
            onClick={() => mutateAsync(state.id)}
          >
            {isPending && <Spinner size="sm" />}
            Return
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReturnLeftAmountBtn;
