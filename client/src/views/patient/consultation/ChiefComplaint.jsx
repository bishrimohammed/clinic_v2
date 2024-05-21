import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { chiefComplaintOptions } from "../utils/chiefComplaintOptions";

const ChiefComplaint = () => {
  return (
    <div className="mt-4">
      <Form>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Chief Complaint</Form.Label>
              {/* <Form.Control as="textarea" /> */}
              <CreatableSelect isMulti options={chiefComplaintOptions} />
            </Form.Group>
          </Col>
          {/* <Col md={6} sm={12}></Col> */}
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>History of Present Illness</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Additional notes</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChiefComplaint;
