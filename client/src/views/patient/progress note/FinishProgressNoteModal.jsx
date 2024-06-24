import React from "react";
import { Modal } from "react-bootstrap";

const FinishProgressNoteModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
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
    </Modal>
  );
};

export default FinishProgressNoteModal;
