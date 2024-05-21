import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useAdmitPatient } from "../hooks/useAdmitPatient";

const AdmitVisitModal = ({ show, handleClose, visitId }) => {
  const { mutateAsync, isPending } = useAdmitPatient();
  const admitHandler = () => {
    mutateAsync(visitId).then((res) => {
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
      backdrop="static"
      centered
    >
      <Modal.Body>{`Are you sure you want to Cancel the  appointmnet?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button variant={"success"} disabled={isPending} onClick={admitHandler}>
          {isPending && <Spinner animation="border" size="sm" />}
          Admit
        </Button>
      </div>
    </Modal>
  );
};

export default AdmitVisitModal;
