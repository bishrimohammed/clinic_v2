import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreditCompanyFilterModal = ({ show, handleClose, setFilter }) => {
  const statusRef = React.useRef();

  const filterHandler = () => {
    setFilter({
      status: statusRef.current.value,
    });
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Credit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select ref={statusRef}>
              <option value="">All</option>
              <option value="true">Active Agreement</option>
              <option value="false">Inactive Agreement</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose(false)}>Close</Button>
        <Button onClick={() => filterHandler()}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreditCompanyFilterModal;
