import React from "react";
import { Form, Modal } from "react-bootstrap";
// import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePatientSocialHistory } from "../../hooks/patientHooks/usePatientSocialHistory";
// import { Form } from "react-router-dom";
import * as yup from "yup";
const pastMedicalHistorySchema = yup.object().shape({
  medical_condition: yup.string().required("Medical Condition is required"),
  treatment: yup.string().required("Treatment is required"),
});
const AddPatientPastMedicalHistory = ({ show, handleClose, patientId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(pastMedicalHistorySchema),
  });
  const submitHandler = (data) => {};
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Patient Past Medical History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Medical condition</Form.Label>
            <Form.Control
              {...register("medical_condition")}
              isInvalid={errors.medical_condition}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {errors.medical_condition?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label> Severity</Form.Label>
            <Form.Select>
              <option>Select</option>
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </Form.Select>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Treatment </Form.Label>
            <Form.Control
              {...register("treatment")}
              isInvalid={errors.treatment}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {errors.treatment?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={handleClose}
            >
              Save
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPatientPastMedicalHistory;
