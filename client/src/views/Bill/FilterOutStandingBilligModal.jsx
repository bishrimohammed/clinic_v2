import React from "react";

import { Form, Modal } from "react-bootstrap";

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
const FilterOutStandingBilligModal = ({
  show,
  handleClose,
  setFilter,
  filter,
}) => {
  const visit_dateRef = React.useRef();
  const stageRef = React.useRef();
  const visitTypeRef = React.useRef();
  console.log(filter);
  return (
    <Modal onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Filter OutStanding Payments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Visit Date</Form.Label>
            <Form.Control
              type="date"
              ref={visit_dateRef}
              defaultValue={filter.visit_date}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stage</Form.Label>
            <Form.Control
              as="select"
              ref={stageRef}
              defaultValue={filter.stage}
            >
              {stage.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Visit Type</Form.Label>
            <Form.Control
              as="select"
              ref={visitTypeRef}
              defaultValue={filter.visit_type}
            >
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
        <button
          className="btn btn-primary"
          onClick={() => {
            setFilter({
              visit_date: visit_dateRef.current.value,
              stage: stageRef.current.value,
              visit_type: visitTypeRef.current.value,
            });
            handleClose();
          }}
        >
          Filter
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default FilterOutStandingBilligModal;
