import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useActivatePatient } from "./hooks/patientHooks/useActivatePatient";
import { useDeactivatePatient } from "./hooks/patientHooks/useDeactivatePatient";

const PatientDeactivateModal = ({ show, handleClose, patientId, action }) => {
  const activatePatient = useActivatePatient();
  const deactivatePatient = useDeactivatePatient();
  const handleSubmit = () => {
    if (action === "Activate") {
      activatePatient.mutateAsync(patientId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    } else {
      deactivatePatient.mutateAsync(patientId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    }
    // handleClose(false);
  };
  return (
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      {/* <Modal.Title>{Act} Patient</Modal.Title> */}
      <Modal.Body>Are you sure you want to {action} this patient?</Modal.Body>
      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "Deactivate" ? "danger" : "success"}
          onClick={handleSubmit}
          disabled={activatePatient.isPending || deactivatePatient.isPending}
        >
          {(activatePatient.isPending || deactivatePatient.isPending) && (
            <Spinner size="sm" />
          )}
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default PatientDeactivateModal;
