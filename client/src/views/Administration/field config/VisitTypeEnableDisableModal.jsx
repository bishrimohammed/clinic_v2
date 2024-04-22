import React from "react";
import { useDisableVisitType } from "./hooks/useDisableVisitType";
import { useEnableVisitType } from "./hooks/useEnableVisitType";
import { Button, Modal, Spinner } from "react-bootstrap";

const VisitTypeEnableDisableModal = ({
  show,
  handleClose,
  action,
  visitTypeId,
}) => {
  const disableMutation = useDisableVisitType();
  const enableMutation = useEnableVisitType();
  const submitHandler = () => {
    if (action === "Disable") {
      disableMutation.mutateAsync(visitTypeId).then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      });
    } else {
      enableMutation.mutateAsync(visitTypeId).then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      });
    }
  };
  return (
    <Modal
      size="sm"
      show={show}
      //   onHide={() => handleClose(false)}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>{`Are you sure you want to ${action} Field?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "Enable" ? "success" : "danger"}
          disabled={disableMutation.isPending || enableMutation.isPending}
          onClick={submitHandler}
        >
          {(disableMutation.isPending || enableMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {/* {action === "delete"
                ? "Delete"
                : action === "deactivate"
                ? "Deactivate"
                : "Activate"} */}
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default VisitTypeEnableDisableModal;
