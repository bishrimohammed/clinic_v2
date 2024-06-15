import React from "react";
import { Modal } from "react-bootstrap";

const ActivateDeactivateApprovalModal = ({
  show,
  handleClose,
  approvaSettingId,
  action,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Activate/Deactivate Approval</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to {action} Approval?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleClose}>
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
