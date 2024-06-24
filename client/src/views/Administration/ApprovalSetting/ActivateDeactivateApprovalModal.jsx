import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useActivateApprovalSetting } from "./hooks/useActivateApprovalSetting";
import { useDeactivateApprovalSetting } from "./hooks/useDeactivateApprovalSetting";

const ActivateDeactivateApprovalModal = ({
  show,
  handleClose,
  approvaSettingId,
  action,
}) => {
  console.log(action);
  console.log(approvaSettingId);
  const activateApprovalSetting = useActivateApprovalSetting();
  const deactivateApprovalSetting = useDeactivateApprovalSetting();
  const submitApprovalSettingHandler = () => {
    if (action === "Deactivate") {
      deactivateApprovalSetting.mutateAsync(approvaSettingId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    } else {
      activateApprovalSetting.mutateAsync(approvaSettingId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Activate/Deactivate Approval</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to {action} Approval?</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary"
          disabled={
            activateApprovalSetting.isPending ||
            deactivateApprovalSetting.isPending
          }
          onClick={submitApprovalSettingHandler}
        >
          {(activateApprovalSetting.isPending ||
            deactivateApprovalSetting.isPending) && <Spinner size="sm" />}
          Yes
        </button>
        <button className="btn btn-danger" onClick={handleClose}>
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivateDeactivateApprovalModal;
