import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useAddPatientAllergy } from "../../hooks/patientHooks/useAddPatientAllergy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
const allergySchema = yup.object().shape({
  allergy_type: yup.string().required("Allergy type is required"),
  severity: yup.string().required("Severity is required"),
  reaction_details: yup.string(),
});
const AddAllergyModal = ({ show, handleClose, patientId }) => {
  const { mutateAsync, isPending } = useAddPatientAllergy();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(allergySchema),
  });
  const submitHandler = (data) => {
    const Data = {
      newAllergy: data,
      patientId: patientId,
    };
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 201) {
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
        <Modal.Title>Add Allergies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Allergy Type</Form.Label>
            <Form.Control
              {...register("allergy_type")}
              isInvalid={errors.allergy_type}
              type="text"
              placeholder="Enter Allergies"
            />
            <Form.Control.Feedback type="invalid">
              {errors.allergy_type?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Severity</Form.Label>
            <Form.Select {...register("severity")} isInvalid={errors.severity}>
              <option value="">Please Select</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.severity?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reaction details</Form.Label>
            <Form.Control
              {...register("reaction_details")}
              type="text"
              placeholder="Enter reaction"
            />
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
              disabled={isPending}
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

export default AddAllergyModal;
