import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeleteAppointment } from "./hooks/useDeleteAppointment";

const DeleteAppointmentModal = ({ show, handleClose, appointmentId }) => {
  const { mutateAsync, isPending } = useDeleteAppointment();
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
      <Modal.Body>{`Are you sure you want to Delete this appointment?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancel
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
          Delete{" "}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteAppointmentModal;
