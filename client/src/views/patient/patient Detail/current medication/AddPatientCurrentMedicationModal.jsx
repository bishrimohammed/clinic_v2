import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePatientSocialHistory } from "../../hooks/patientHooks/useAddPatientSocialHistory";
// import { Form } from "react-router-dom";
import * as yup from "yup";
const currentMedicationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  dosage: yup.string().required("Dosage Use is required"),
  frequency: yup.string().required("Frequency is required"),
  start_date: yup.string(),
});
const AddPatientCurrentMedicationModal = ({ show, handleClose, patientId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(currentMedicationSchema),
  });
  const submitHandler = (data) => {
    mutateAsync(data)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        const errors = err.response.data.message;
        if (Array.isArray(errors)) {
          errors.map((err) => {
            const msg = err.message;
            // console.log(err.path);
            // console.log(err.message);
            // setError(err.path, msg.join(""));
          });
        } else {
          // console.log(err);
          const errors = err.response.data.message;
        }
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Patient Current Medication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register("name")}
              isInvalid={errors.name}
              type="text"
              placeholder="name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dosage</Form.Label>
            <Form.Control
              type="text"
              {...register("dosage")}
              isInvalid={errors.dosage}
              placeholder="dosage"
            />
            <Form.Control.Feedback type="invalid">
              {errors.dosage?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>frequency</Form.Label>
            <Form.Control
              {...register("frequency")}
              isInvalid={errors.frequency}
              type="text"
              placeholder="frequency"
            />
            <Form.Control.Feedback type="invalid">
              {errors.frequency?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>start date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPatientCurrentMedicationModal;
