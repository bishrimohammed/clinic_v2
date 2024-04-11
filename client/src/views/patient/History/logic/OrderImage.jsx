import React from "react";
import { Button, Modal } from "react-bootstrap";

const OrderImage = (props) => {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>prescribe</Modal.Title>
      </Modal.Header>
      <Modal.Body>image</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderImage;
