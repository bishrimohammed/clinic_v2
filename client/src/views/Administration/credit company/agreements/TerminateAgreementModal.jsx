import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useTerminateAgreement } from "../hooks/useTerminateAgreement";
import { isPending } from "@reduxjs/toolkit";

const TerminateAgreementModal = ({ show, handleClose, id }) => {
  const terminateMutation = useTerminateAgreement();

  const terminateHandler = () => {
    terminateMutation.mutateAsync(id).then((res) => {
      if (res.status === 200) {
        handleClose(false);
      }
    });
  };
  return (
    <Modal
      show={show}
      onHide={() => handleClose(false)}
      centered
      backdrop="static"
      keyboard={false}
      size="sm"
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Terminate Agreement</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        Are you sure you want to terminate this agreement?
      </Modal.Body>
      <div className="d-flex justify-content-end gap-2 p-2">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button
          disabled={terminateMutation.isPending}
          variant="primary"
          onClick={terminateHandler}
        >
          {terminateMutation.isPending && (
            <Spinner animation="border" size="sm" />
          )}
          Terminate
        </Button>
      </div>
    </Modal>
  );
};

export default TerminateAgreementModal;
