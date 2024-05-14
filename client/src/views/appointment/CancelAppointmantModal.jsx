import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useCancelAppointment } from "./hooks/useCancelAppointment";

const CancelAppointmantModal = ({ show, handleClose, appointmentId }) => {
  const { mutateAsync, isPending } = useCancelAppointment();
  console.log(appointmentId);
  const clickHandler = () => {
    mutateAsync(appointmentId).then((res) => {
      if (res.status === 200) {
        handleClose();
      }
    });
  };
  return (
    <Modal
      size="sm"
      centered
      show={show}
      onHide={() => handleClose()}
      backdrop="static"
      keyboard=""
    >
      <Modal.Body>{`Are you sure you want to Cancel the  appointmnet?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose()}>
          Exit
        </Button>
        <Button
          variant={"danger"}
          // disabled={deleteMutation.isPending || deactiveMutation.isPending}
          disabled={isPending}
          onClick={clickHandler}
        >
          {isPending && <Spinner animation="border" size="sm" />}
          {/* {action === "delete"
      ? "Delete"
      : action === "deactivate"
      ? "Deactivate"
      : "Activate"} */}
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default CancelAppointmantModal;
