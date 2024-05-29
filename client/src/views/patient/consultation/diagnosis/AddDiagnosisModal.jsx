import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { useAddDiagnosis } from "../../hooks/consultationHooks/useAddDiagnosis";
const diagnosisSchema = yup.object().shape({
  diagnosis: yup
    .string()
    .transform((value) => value.trim())
    .required("Diagnosis Name is required"),
});
const AddDiagnosisModal = ({ show, handelClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(diagnosisSchema),
  });
  const diagnosisRef = React.useRef();
  const { state } = useLocation();
  const { mutateAsync, isPending } = useAddDiagnosis();
  const submitHandler = (data) => {
    // e.preventDefault();
    // const diagnosis = diagnosisRef.current.value;
    // console.log(data);
    mutateAsync({ formData: data, medicalRecordId: state.medicalRecord_id })
      .then((res) => {
        if (res.status === 201) {
          handelClose();
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
      });
  };
  return (
    <Modal show={show} onHide={handelClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Diagnosis</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Diagnosis Name</Form.Label>
            <Form.Control
              // ref={diagnosisRef}
              {...register("diagnosis")}
              isInvalid={errors.diagnosis}
              type="text"
              placeholder="Enter Diagnosis"
            />
            <Form.Control.Feedback type="invalid">
              {errors.diagnosis?.message}
            </Form.Control.Feedback>
            {/* <Form.Text className="text-muted">Enter Diagnosis</Form.Text> */}
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handelClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDiagnosisModal;
