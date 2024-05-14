import React from "react";
import { Form, Modal } from "react-bootstrap";
const status = [
  { label: "All", value: "" },
  { label: "Active Visit", value: "true" },
  { label: "Inactive Visit", value: "false" },
];
const stage = [
  { label: "All", value: "" },

  { label: "Waiting for service fee", value: "Waiting for service fee" },
  { label: "Waiting for triage", value: "Waiting for triage" },
  { label: "Waiting for examiner", value: "Waiting for examiner" },
];
const visitType = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Consultation",
    value: "Consultation",
  },
  {
    label: "Follow-up",
    value: "Follow-up",
  },
  {
    label: "Emergency",
    value: "Emergency",
  },
  {
    label: "Routine",
    value: "Routine",
  },
  {
    label: "Other",
    value: "Other",
  },
];
const FilterVisitModal = ({ show, handleClose, setFilter }) => {
  const statusRef = React.useRef();
  const stageRef = React.useRef();
  const visitTypeRef = React.useRef();
  const filterHandler = () => {
    const statusValue = statusRef.current.value;
    const stageValue = stageRef.current.value;
    const visitTypeValue = visitTypeRef.current.value;
    setFilter({
      status: statusValue,
      stage: stageValue,
      visitType: visitTypeValue,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" ref={statusRef}>
              {status.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stage</Form.Label>
            <Form.Control as="select" ref={stageRef}>
              {stage.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Visit Type</Form.Label>
            <Form.Control as="select" ref={visitTypeRef}>
              {visitType.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={filterHandler}>
          Filter
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterVisitModal;
