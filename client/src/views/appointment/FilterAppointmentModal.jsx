import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const status = [
  { label: "All", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Overdue", value: "overdue" },
];
const FilterAppointmentModal = ({ show, handleClose, setFilter }) => {
  const statusRef = useRef();
  const filterHandler = () => {
    const statusValue = statusRef.current.value;
    setFilter({ status: statusValue });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select ref={statusRef}>
              {status.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={filterHandler}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterAppointmentModal;
