import React, { useRef } from "react";
import { Form, Modal } from "react-bootstrap";
// import { Form } from "react-hook-form";
const status = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: "true",
  },
  {
    label: "Inactive",
    value: "false",
  },
];
const FilterApprovalModal = ({ show, handleClose, setFilter, filter }) => {
  const statusRef = useRef("");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
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
            setFilter({
              ...filter,
              status: statusRef.current.value,
            });
            handleClose();
          }}
        >
          Ok
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterApprovalModal;
