import React, { Fragment } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const AddSickNoteModal = ({
  show,
  handleClose,
  fieldsLength,
  diagnosis,
  register,
  errors,
  getValues,
  remove,
}) => {
  console.log(errors.sick_notes?.[fieldsLength - 1]?.end_date);
  return (
    <Modal
      show={show}
      onHide={() => {
        if (
          errors.sick_notes?.[fieldsLength - 1]?.end_date ||
          getValues(`sick_notes[${fieldsLength - 1}].end_date`) === ""
        ) {
          //   console.log(`sick_notes[${fieldsLength - 1}].end_date`);
          remove(fieldsLength - 1);
        }
        handleClose(false);
      }}
      //   backdrop="static"
    >
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Add Sick Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="my-3 px-2">
          <Form.Label>
            {" "}
            <span className="border-bottom pb-1">Diagnosis</span>{" "}
          </Form.Label>
          {diagnosis?.map((d, index) => (
            <Fragment key={d.id}>
              <Form.Check
                type="checkbox"
                {...register(
                  `sick_notes.${fieldsLength - 1}.diagnosis[${index}].value`
                )}
                label={d.diagnosis + "(" + d.status + ")"}
                // placeholder="Diagnosis"
              />
              <input
                type="hidden"
                {...register(
                  `sick_notes.${
                    fieldsLength - 1
                  }.diagnosis[${index}].diagnosis_id`
                )}
                value={d.id}
              />
            </Fragment>
          ))}
        </Form.Group>
        <Row>
          <Col md={4} sm={12}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                {...register(`sick_notes.${fieldsLength - 1}.start_date`)}
                placeholder="Start Date"
                isInvalid={errors?.sick_notes?.[fieldsLength - 1]?.start_date}
                defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sick_notes?.[fieldsLength - 1]?.start_date?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                {...register(`sick_notes.${fieldsLength - 1}.end_date`)}
                placeholder="End Date"
                isInvalid={errors.sick_notes?.[fieldsLength - 1]?.end_date}
                min={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sick_notes?.[fieldsLength - 1]?.end_date?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={12}></Col>
          <Col md={4} sm={12}></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Ok
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default AddSickNoteModal;
