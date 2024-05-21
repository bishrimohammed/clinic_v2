import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useVoidPayment } from "../hooks/useVoidPayment";

const VoidPaymentModal = ({ show, handleClose, paymentId }) => {
  const { mutateAsync, isPending } = useVoidPayment();
  const voidHandler = () => {
    mutateAsync(paymentId).then((res) => {
      if (res.status === 200) {
        handleClose();
      }
    });
  };
  return (
    <Modal
      size="sm"
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Void Payment</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>Are you sure you want to void this payment?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={voidHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoidPaymentModal;
