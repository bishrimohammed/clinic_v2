import React, { Fragment } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

const AddReferralNoteModal = ({
  show,
  handleClose,
  fieldsLength,
  diagnosis,
  register,
  errors,
  getValues,
  remove,
  watch,
}) => {
  //   console.log(errors);

  return (
    <Modal
      size="md"
      show={show}
      onHide={() => {
        if (
          errors.referral_notes?.[fieldsLength - 1]?.hospital_name ||
          getValues(`referral_notes[${fieldsLength - 1}].hospital_name`) ===
            "" ||
          getValues(`referral_notes[${fieldsLength - 1}].clinical_finding`) ===
            "" ||
          errors.referral_notes?.[fieldsLength - 1]?.clinical_finding
        ) {
          console.log(
            getValues(`referral_notes[${fieldsLength - 1}].hospital_name`)
          );
          remove(fieldsLength - 1);
        }
        handleClose(false);
      }}
      //   backdrop="static"
    >
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Add Referral Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="">
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                // type="date"
                type="text"
                {...register(
                  `referral_notes.[${fieldsLength - 1}].hospital_name`
                )}
                // placeholder="Start Date"
                isInvalid={
                  errors.referral_notes?.[fieldsLength - 1]?.hospital_name
                }
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors.referral_notes?.[fieldsLength - 1].hospital_name
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                // type="date"
                type="text"
                {...register(
                  `referral_notes.[${fieldsLength - 1}].department_name`
                )}
                // placeholder="Start Date"
                isInvalid={
                  errors.referral_notes?.[fieldsLength - 1]?.department_name
                }
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors.referral_notes?.[fieldsLength - 1]?.department_name
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group>
              <Form.Label>Clinical Finding</Form.Label>
              <Form.Control
                // type="date"
                as="textarea"
                {...register(
                  `referral_notes.[${fieldsLength - 1}].clinical_finding`
                )}
                // placeholder="Start Date"
                isInvalid={
                  errors.referral_notes?.[fieldsLength - 1]?.clinical_finding
                }
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors?.referral_notes?.[fieldsLength - 1]?.clinical_finding
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                // type="date"
                type="text"
                {...register(`referral_notes.[${fieldsLength - 1}].reason`)}
                // placeholder="Start Date"
                isInvalid={errors.referral_notes?.[fieldsLength - 1]?.reason}
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.referral_notes?.[fieldsLength - 1]?.reason?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
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

export default AddReferralNoteModal;
