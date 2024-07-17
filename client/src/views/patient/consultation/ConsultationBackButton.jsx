import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ConsultationBackButton = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  return (
    <>
      <IoMdArrowRoundBack
        className="cursorpointer"
        size={22}
        style={{ cursor: "pointer" }}
        onClick={() => {
          // navigate(-1);
          setShowConfirmModal(true);
        }}
      />
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        size="sm"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Confirm Navigation</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>Are you sure you want to go back?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConsultationBackButton;
