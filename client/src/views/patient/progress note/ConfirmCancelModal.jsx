import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmCancelModal = ({ show, handleClose, resetHandler }) => {
  return (
    <Modal
      size="sm"
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Body>
        Are you sure you want to cancel progerss note
        <div className="d-flex justify-content-end gap-2 mt-2">
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              resetHandler();
              handleClose();
            }}
          >
            Yes
          </Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default ConfirmCancelModal;
