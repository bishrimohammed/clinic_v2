import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeactivateRole } from "./hooks/useDeactivateRole";
import { useActivateRole } from "./hooks/useActivateRole";

const DeactivateRoleModal = ({ show, handleClose, roleId, action }) => {
  const deactiveMutation = useDeactivateRole();
  const activeMutation = useActivateRole();
  // console.log(action);
  const clickHandler = () => {
    if (action === "Deactivate") {
      // console.log(action);
      deactiveMutation.mutateAsync(roleId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    } else {
      activeMutation.mutateAsync(roleId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
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
      <Modal.Body>{`Are you sure you want to ${action} role?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        {/* <Button
          variant="danger"
          disabled={deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {deactiveMutation.isPending && (
            <Spinner animation="border" size="sm" />
          )}
          Deactivate
        </Button> */}
        <Button
          variant={action === "Activate" ? "success" : "danger"}
          disabled={activeMutation.isPending || deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {(activeMutation.isPending || deactiveMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default DeactivateRoleModal;
