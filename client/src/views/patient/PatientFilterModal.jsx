import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const gender = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];
const status = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active Patient",
    value: "true",
  },
  {
    label: "Inactive Patient",
    value: "false",
  },
];
const paymentWay = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Self Payer Patient",
    value: "false",
  },
  {
    label: "Credit Patient",
    value: "true",
  },
];
const patientType = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Existing Patient",
    value: "false",
  },
  {
    label: "New Patient",
    value: "true",
  },
];

const PatientFilterModal = ({ show, handleClose, filter, setFilter }) => {
  const genderRef = useRef();
  const statusRef = useRef();
  const paymentWayRef = useRef();
  const patientTypeRef = useRef();
  console.log(filter);
  const filterHandler = () => {
    setFilter({
      gender: genderRef.current.value,
      status: statusRef.current.value,
      is_credit: paymentWayRef.current.value,
      is_new: patientTypeRef.current.value,
    });
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
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
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" ref={genderRef}>
              {gender.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Way</Form.Label>
            <Form.Control as="select" ref={paymentWayRef}>
              {paymentWay.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Patient Type</Form.Label>
            <Form.Control as="select" ref={patientTypeRef}>
              {patientType.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary">Close</Button> */}
        <Button variant="primary" onClick={filterHandler}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientFilterModal;
