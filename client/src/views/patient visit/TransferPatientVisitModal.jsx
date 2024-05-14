import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useGetDoctors } from "../Scheduling/hooks/useGetDoctors";
import { useForm } from "react-hook-form";
import { format, parse } from "date-fns";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTransferPatientVisit } from "./hooks/useTransferPatientVisit";
const visitSchema = yup.object().shape({
  // patient_id: yup.string().required("Patient is required"),
  doctor_id: yup.string().required("Doctor is required"),
});

const TransferPatientVisitModal = ({ show, handleClose, visit }) => {
  const { data: doctors } = useGetDoctors();
  const { mutateAsync, isPending } = useTransferPatientVisit();
  //   console.log(visit);
  //   console.log(
  //     format(
  //       parse(visit.visit_time, "HH:mm:ss", visit.assignment_date),
  //       "yyyy-MM-dd'T'HH:mm"
  //     )
  //   );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(visitSchema),
  });
  const [errorState, setErrorState] = useState("");
  useEffect(() => {
    if (errorState) {
      const timeoutId = setTimeout(() => {
        setErrorState("");
      }, 5000);

      // Clean up the timeout when the effect is re-run or unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [errorState]);
  const submitHandler = (data) => {
    // console.log(data);
    // handleClose();
    const Data = {
      visitId: visit.id,
      formData: data,
    };
    // console.log(Data);
    // return;
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      })
      .catch((err) => {
        // console.log(err);
        // const errors = err.response.data.message;
        // if (Array.isArray(errors)) {
        //   errors.map((err) => {
        //     // console.log(err);
        //   });
        // } else {
        //   // console.log(errors);
        // }
        setErrorState(err?.response?.data?.message);
      });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Transfer Patient Visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>Are you sure you want to transfer this visit?</p> */}
        {errorState && (
          <Alert variant="danger" dismissible>
            {" "}
            {errorState}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Patient</Form.Label>
                <Form.Control
                  //   {...register("patient_id")}
                  //   isInvalid={errors.patient_id}
                  defaultValue={
                    visit.patient.firstName +
                    " " +
                    visit.patient.middleName +
                    " " +
                    visit.patient.lastName
                  }
                  aria-label="Default select example"
                >
                  {/* <option value="">Select Patient</option>
                  {patients?.map((patient, index) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.middleName}{" "}
                      {patient.lastName}
                    </option>
                  ))} */}
                </Form.Control>
                {/* <Form.Control.Feedback type="invalid">
                  {errors.patient_id?.message}
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Doctor</Form.Label>
                <Form.Control
                  //   {...register("doctor_id")}
                  //   isInvalid={errors.doctor_id}
                  defaultValue={
                    visit.doctor.employee.firstName +
                    " " +
                    visit.doctor.employee.middleName +
                    " " +
                    visit.doctor.employee.lastName
                  }
                  disabled={true}
                  aria-label="Default select example"
                >
                  {/* <option value="">Select Doctor</option>
                  {doctors?.map((doctor, index) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.employee.firstName} {doctor.employee.middleName}{" "}
                      {doctor.employee.lastName}
                    </option>
                  ))} */}
                </Form.Control>
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
                  //   {...register("date", {
                  //     onChange: (e) => {
                  //       console.log(format(new Date(), "HH:mm"));
                  //       const dateTime = e.target.value;
                  //       const date = dateTime.substring(0, 10);
                  //       const time = dateTime.substring(11, 16);
                  //       console.log(time);
                  //       if (
                  //         date === new Date().toISOString().substring(0, 10) &&
                  //         time < format(new Date(), "HH:mm")
                  //       ) {
                  //         setError("date", {
                  //           type: "manual",
                  //           message:
                  //             "Time must be greater than or equal to the current time",
                  //         });
                  //       } else if (visitDateWatcher) {
                  //         clearErrors("date");
                  //       }
                  //     },
                  //   })}
                  //   value={visit.assignment_date}
                  defaultValue={format(
                    parse(visit.visit_time, "HH:mm:ss", visit.assignment_date),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
                  disabled={true}
                  // new Date(visit.assignment_date)
                  // .toISOString()
                  // .substring(0, 16)}
                  //   isInvalid={errors.date}
                  //   min={new Date(visit.assignment_date).toISOString().substring(0, 16)}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {errors.date?.message}
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Visit Type</Form.Label>
                <Form.Select
                  defaultValue={visit.visit_type}
                  disabled={true}
                  readOnly
                  //   {...register("type")}
                  //   isInvalid={errors.type}
                  aria-label="Default select example"
                >
                  <option value="">Please Select</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Routine">Routine Check-up</option>{" "}
                  <option value="Other">Other</option>
                </Form.Select>
                {/* <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Visit Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  defaultValue={visit.reason}
                  disabled={true}
                  readOnly
                  //   {...register("reason")}
                  //   isInvalid={errors.reason}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {errors.reason?.message}
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            {/* new Examiner */}
            <Col md={4} sm={12} className=" mb-2">
              <Form.Group>
                <Form.Label>New Examiner</Form.Label>
                <Form.Control
                  as="select"
                  //   defaultValue={visit.new_examiner}
                  {...register("doctor_id")}
                  //   disabled={true}
                  //   {...register("new_examiner")}
                  isInvalid={errors.doctor_id}
                >
                  <option value="">Select Doctor</option>
                  {doctors
                    ?.filter((d) => d.id !== visit.doctor.id)
                    .map((doctor, index) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.employee.firstName} {doctor.employee.middleName}{" "}
                        {doctor.employee.lastName}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.doctor_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={isPending} variant="primary" type="submit">
              {isPending && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Transfer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransferPatientVisitModal;
