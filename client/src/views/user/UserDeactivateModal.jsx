import React from "react";
import { useDeactivateUser } from "./hooks/useDeactivateUser";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useActivateUser } from "./hooks/useActivateUser";

const UserDeactivateModal = ({ show, handleClose, userId, action }) => {
  const deactiveMutation = useDeactivateUser();
  const activateMutation = useActivateUser();

  // console.log(action);
  const clickHandler = () => {
    if (action === "Deactivate") {
      deactiveMutation.mutateAsync(userId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    } else {
      activateMutation.mutateAsync(userId).then(async (res) => {
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
      <Modal.Body>{`Are you sure you want to ${action} User?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "Deactivate" ? "danger" : "success"}
          disabled={deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {deactiveMutation.isPending && (
            <Spinner animation="border" size="sm" />
          )}
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default UserDeactivateModal;
