import React, { useMemo } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useAddPatientSocialHistory } from "../../hooks/patientHooks/useAddPatientSocialHistory";
// import { Form } from "react-router-dom";
import * as yup from "yup";
import { useAddPatientSocialHistory } from "../../hooks/patientHooks/useAddPatientSocialHistory";
const socialHistorySchema = yup.object().shape({
  tobacco_use: yup.string().required("Tobacco Use is required"),
  alcohol_use: yup.string().required("Alcohol Use is required"),
});
const AddPatientSocialHistoryModal = ({ show, handleClose, patientId }) => {
  const { mutateAsync, isPending } = useAddPatientSocialHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(socialHistorySchema),
  });
  const submitHandler = (data) => {
    const Data = {
      newSocialHistory: data,
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
        <Modal.Title>Add Patient Social History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label> Tobacco use</Form.Label>
            <Form.Select
              {...register("tobacco_use")}
              isInvalid={errors.tobacco_use}
            >
              {/* smoker, Former smoker, Non-smoker */}
              <option value={""}>Please Select</option>
              <option value="Current smoker">Smoker</option>
              <option value="Former smoker">Former Smoker</option>
              <option value="Non-smoker">Non-smoker</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tobacco_use?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alcohol use</Form.Label>
            <Form.Control
              {...register("alcohol_use")}
              isInvalid={errors.alcohol_use}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {errors.alcohol_use?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              // onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary "
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

export default AddPatientSocialHistoryModal;
