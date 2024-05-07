import React, { useRef } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const CalculateBirthDateModal = ({ show, handleClose, setValue }) => {
  const ageRef = useRef();
  const monthRef = useRef(0);
  const dayRef = useRef(0);
  const calculate = (e) => {
    e.preventDefault();
    const age = ageRef.current.value;
    const month = monthRef.current.value;
    const day = dayRef.current.value;
    console.log(month);
    const today = new Date();
    const birthYear = today.getFullYear() - parseInt(Math.abs(age));
    const birthMonth =
      today.getMonth() + 1 - parseInt(Math.abs(month > 12 ? 12 : month));
    const birthDay = today.getDate() - parseInt(Math.abs(day > 30 ? 30 : day));
    const birthDate = new Date(
      birthYear,
      birthMonth ? birthMonth : 0,
      birthDay ? birthDay : today.getDate()
    );
    console.log(birthDate);
    setValue("birth_date", birthDate.toISOString().substring(0, 10));
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Calculate Birth Date</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={calculate}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  ref={ageRef}
                  required
                  type="number"
                  min={0}
                  max={100}
                  name="age"
                />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group className="mb-3">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  ref={monthRef}
                  type="number"
                  min={0}
                  name="month"
                  max={12}
                />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  ref={dayRef}
                  type="number"
                  min={0}
                  name="day"
                  max={30}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={calculate}>
              Calculate
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CalculateBirthDateModal;
