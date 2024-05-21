import React, { useRef } from "react";
import { Form, Modal } from "react-bootstrap";
const status = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Paid",
    value: "Paid",
  },
  {
    label: "Unpaid",
    value: "Unpaid",
  },
  {
    label: "Void",
    value: "Void",
  },
];
const FilterPaymentsModal = ({ show, handleClose, setFilter, filter }) => {
  const statusRef = useRef();
  console.log(filter.status);
  return (
    <Modal onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Payments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select ref={statusRef} defaultValue={filter.status}>
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
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setFilter({ status: statusRef.current.value });
            handleClose();
          }}
        >
          Filter
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterPaymentsModal;
