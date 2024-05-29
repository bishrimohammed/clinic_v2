import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useConfirmDiagnosis } from "../../hooks/consultationHooks/diagnosis/useConfirmDiagnosis";
import { useRuleOutDiagnosis } from "../../hooks/consultationHooks/diagnosis/useRuleOutDiagnosis";

const ConfirmDiagnosisModal = ({ show, handleClose, diagnosisId, action }) => {
  //   const { mutateAsync, isPending } = useConfirmDiagnosis();
  const confirmMutuation = useConfirmDiagnosis();
  const ruleoutMutation = useRuleOutDiagnosis();
  const confirmHandler = () => {
    if (action === "Confirm") {
      confirmMutuation.mutateAsync(diagnosisId).then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      });
    } else {
      ruleoutMutation.mutateAsync(diagnosisId).then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      });
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      size="sm"
    >
      <Modal.Body>{`Are you sure you want to ${action} this Diagnosis?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={action === "Confirm" ? "success" : "danger"}
          disabled={confirmMutuation.isPending || ruleoutMutation.isPending}
          //   disabled={confirmMutuation.isPending || }
          onClick={confirmHandler}
        >
          {(confirmMutuation.isPending || ruleoutMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}

          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDiagnosisModal;
