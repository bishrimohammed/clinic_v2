import React from "react";
import { Button, Modal } from "react-bootstrap";

const VitalSignDeactivateActivateModal = () => {
  return (
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>{`Are you sure you want to ${action} employee?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "activate" ? "success" : "danger"}
          disabled={deleteMutation.isPending || deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {(deleteMutation.isPending || deactiveMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action === "delete"
            ? "Delete"
            : action === "deactivate"
            ? "Deactivate"
            : "Activate"}
        </Button>
      </div>
    </Modal>
  );
};

export default VitalSignDeactivateActivateModal;
