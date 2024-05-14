import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetDoctors } from "../Scheduling/hooks/useGetDoctors";
import { useGetPatientForSelect } from "../patient/hooks/patientHooks/useGetPatientForSelect";
import { format } from "date-fns";
import { useAddPatientVisit } from "./hooks/useAddPatientVisit";
const visitSchema = yup.object().shape({
  patient_id: yup.string().required("Patient is required"),
  doctor_id: yup.string().required("Doctor is required"),
  date: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .required("Date and time is required"),
  // time: yup.string().required("Time is required"),
  reason: yup
    .string()
    .transform((value) => value.trim())
    .required("Visit reason is required"),
  type: yup.string().required("Visit Type is required"),
});
const AddPatientVisitModal = ({ show, handleClose }) => {
  const { data: doctors } = useGetDoctors();
  const { data: patients } = useGetPatientForSelect();
  //   console.log(doctors);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
    clearErrors,
  } = useForm({
    resolver: yupResolver(visitSchema),
    // defaultValues: {
    //   username: "",
    //   password: "",
    // }
  });
  const { mutateAsync, isPending } = useAddPatientVisit();
  const [errorState, setErrorState] = useState("");
  const visitDateWatcher = watch("date");
  //   console.log(patients);
  const submitHandler = (data) => {
    mutateAsync(data)
      .then((res) => {
        if (res.status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        setErrorState(err.response.data.message);
      });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Visits </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState && (
          <Alert variant="danger" dismissible>
            {errorState}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Patient</Form.Label>
                <Form.Select
                  {...register("patient_id")}
                  isInvalid={errors.patient_id}
                  aria-label="Default select example"
                >
                  <option value="">Select Patient</option>
                  {patients?.map((patient, index) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.middleName}{" "}
                      {patient.lastName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.patient_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  {...register("doctor_id")}
                  isInvalid={errors.doctor_id}
                  aria-label="Default select example"
                >
                  <option value="">Select Doctor</option>
                  {doctors?.map((doctor, index) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.employee.firstName} {doctor.employee.middleName}{" "}
                      {doctor.employee.lastName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.doctor_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Visit Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  {...register("date", {
                    onChange: (e) => {
                      console.log(format(new Date(), "HH:mm"));
                      const dateTime = e.target.value;
                      const date = dateTime.substring(0, 10);
                      const time = dateTime.substring(11, 16);
                      console.log(time);
                      if (
                        date === new Date().toISOString().substring(0, 10) &&
                        time < format(new Date(), "HH:mm")
                      ) {
                        setError("date", {
                          type: "manual",
                          message:
                            "Time must be greater than or equal to the current time",
                        });
                      } else if (visitDateWatcher) {
                        clearErrors("date");
                      }
                    },
                  })}
                  isInvalid={errors.date}
                  min={new Date().toISOString().substring(0, 16)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Visit Type</Form.Label>
                <Form.Select
                  {...register("type")}
                  isInvalid={errors.type}
                  aria-label="Default select example"
                >
                  <option value="">Please Select</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Routine">Routine Check-up</option>{" "}
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Visit Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("reason")}
                  isInvalid={errors.reason}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reason?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPatientVisitModal;
