import React from "react";
import { useDisablePhysicalExam } from "./hooks/useDisablePhysicalExam";
import { useEnablePhysicalExam } from "./hooks/useEnablePhysicalExam";
import { Button, Modal, Spinner } from "react-bootstrap";

export const PhysicalExamEnableDisableModal = ({
  show,
  handleClose,
  action,
  phyicalExamId,
}) => {
  console.log(phyicalExamId);
  const disableMutation = useDisablePhysicalExam();
  const enableMutation = useEnablePhysicalExam();
  const submitHandler = () => {
    if (action === "Disable") {
      disableMutation.mutateAsync(phyicalExamId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    } else {
      enableMutation.mutateAsync(phyicalExamId).then((res) => {
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
