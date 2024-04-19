import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ServiceFilterModal = ({ show, handleClose, setFilter, filter }) => {
  const statusRef = useRef(filter.status);

  const filterHandler = (event) => {
    // console.log(statusRef.current.value);
    // return;
    event.preventDefault();
    setFilter({ status: statusRef.current.value });
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Service Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Service Status</Form.Label>
            <Form.Select
              ref={statusRef}
              //   onChange={(e) => setfilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => filterHandler(e)}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceFilterModal;
