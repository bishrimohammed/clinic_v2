import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const FollowUpVisit = () => {
  return (
    <div>
      <Row>
        <Col md={7} sm={12}>
          <Form.Group className="mb-3 d-flex gap-3 align-items-center">
            <Form.Label className="text-nowrap">Due Date</Form.Label>
            <Form.Control type="date" className="w-50" />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FollowUpVisit;
