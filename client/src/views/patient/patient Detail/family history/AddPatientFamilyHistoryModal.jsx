import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useAddPatientFamilyHistory } from "../../hooks/patientHooks/useAddPatientFamilyHistory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePatientSocialHistory } from "../../hooks/patientHooks/usePatientSocialHistory";
// import { Form } from "react-router-dom";
import * as yup from "yup";
const familyHistorySchema = yup.object().shape({
  medical_condition: yup.string().required("Medical condition is required"),
  relationship: yup.string().required("Relationship is required"),
  other_relationship: yup
    .string()
    .when("relationship", ([relationship], schema) => {
      if (relationship === "Other") {
        return schema.required("Other Relationship is required");
      }
      return schema.nullable();
    }),
});
const AddPatientFamilyHistoryModal = ({ show, handleClose, patientId }) => {
  const { mutateAsync, isPending } = useAddPatientFamilyHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(familyHistorySchema),
  });
  console.log(errors);
  const relationshipWatcher = watch("relationship");
  const submitHandler = (data) => {
    const Data = {
      newFamilyHistory: {
        medical_condition: data.medical_condition,
        relationship:
          data.relationship !== "Other"
            ? data.relationship
            : data.other_relationship,
      },
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
        <Modal.Title>Add Patient Family History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Medical Condition</Form.Label>
            <Form.Control
              {...register("medical_condition")}
              isInvalid={errors.medical_condition}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {errors.medical_condition?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Relationship</Form.Label>
            <Form.Select
              {...register("relationship")}
              isInvalid={errors.relationship}
            >
              <option value="">Please Select</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>

              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.relationship?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {relationshipWatcher === "Other" && (
            <Form.Group className="mb-3">
              <Form.Label>Relationship Type</Form.Label>
              <Form.Control
                type="text"
                {...register("other_relationship")}
                isInvalid={errors.other_relationship}
              />
              <Form.Control.Feedback type="invalid">
                {errors.other_relationship?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
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

export default AddPatientFamilyHistoryModal;
