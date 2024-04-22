import React from "react";
import { Button, Modal } from "react-bootstrap";

const UpdateCreditCompanyModal = ({ show, handleClose, company }) => {
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Credit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>test</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose(false)}>Close</Button>
        <Button onClick={() => handleClose(false)}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCreditCompanyModal;
