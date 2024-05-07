import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useActivateCompanyEmployee } from "../hooks/useActivateCompanyEmployee";
import { useDeactiveCompanyEmployee } from "../hooks/useDeactiveCompanyEmployee";

const DeactivateEmaployeeModal = ({
  show,
  handleClose,
  action,
  employeeId,
}) => {
  const activateMutation = useActivateCompanyEmployee();
  const deactivateMutation = useDeactiveCompanyEmployee();
  const handleSubmit = () => {
    if (action === "Activate") {
      activateMutation.mutateAsync(employeeId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    } else {
      deactivateMutation.mutateAsync(employeeId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    }
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
      <Modal.Body>{`Are you sure you want to ${action} employee?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "Activate" ? "success" : "danger"}
          disabled={deactivateMutation.isPending || activateMutation.isPending}
          onClick={handleSubmit}
        >
          {(deactivateMutation.isPending || activateMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default DeactivateEmaployeeModal;
