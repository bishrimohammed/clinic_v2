import React from "react";
import { Form, Modal } from "react-bootstrap";
const ChangeHIVStatusModal = ({ show, handleClose, status }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change HIV Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>has HIV</Form.Label>
            <Form.Control as="select" defaultValue="false">
              {/* {status.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))} */}
              <option value="">Please Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleClose}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeHIVStatusModal;
