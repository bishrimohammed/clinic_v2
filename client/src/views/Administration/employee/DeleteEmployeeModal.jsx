import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeleteEmployee } from "./hooks/useDeleteEmployee";
import { useDeactivateEmployee } from "./hooks/useDeactivateEmployee";
import { useActivateEmployee } from "./hooks/useActivateEmployee";

const DeleteEmployeeModal = ({ show, handleClose, employeeId, action }) => {
  const deleteMutation = useDeleteEmployee();
  const deactiveMutation = useDeactivateEmployee();
  const activateMutation = useActivateEmployee();

  // console.log(employeeId);
  const clickHandler = () => {
    if (action === "delete") {
      deleteMutation.mutateAsync(employeeId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    }
    if (action === "deactivate") {
      deactiveMutation.mutateAsync(employeeId).then(async (res) => {
        if (res.status === 200) {
          // refetch();
          handleClose(false);
        }
      });
    } else {
      activateMutation.mutateAsync(employeeId).then(async (res) => {
        if (res.status === 200) {
          // refetch();
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

export default DeleteEmployeeModal;
