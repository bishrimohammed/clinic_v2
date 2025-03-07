import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDisableVitalSign } from "./hooks/useDisableVitalSign";
import { useEnableVitalSign } from "./hooks/useEnableVitalSign";

const VitalSignDeactivateActivateModal = ({
  show,
  handleClose,
  vitalSignId,
  action,
}) => {
  const disableMutation = useDisableVitalSign();
  const enableMutation = useEnableVitalSign();
  const submitHandler = () => {
    if (action === "Disable") {
      disableMutation.mutateAsync(vitalSignId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    } else {
      enableMutation.mutateAsync(vitalSignId).then((res) => {
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

export default VitalSignDeactivateActivateModal;
