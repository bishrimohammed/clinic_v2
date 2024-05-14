import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useCancelPatientVisit } from "./hooks/useCancelPatientVisit";

const CancelPatientVisitModal = ({ show, handleClose, visitId }) => {
  const { mutateAsync, isPending } = useCancelPatientVisit();
  const clickHandler = () => {
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
      onHide={() => handleClose()}
      backdrop="static"
      centered
    >
      <Modal.Body>{`Are you sure you want to Cancel the  appointmnet?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose()}>
          Exit
        </Button>
        <Button variant={"danger"} disabled={isPending} onClick={clickHandler}>
          {isPending && <Spinner animation="border" size="sm" />}
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default CancelPatientVisitModal;
