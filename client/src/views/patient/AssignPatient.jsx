import { differenceInYears, parseISO } from "date-fns";
import React from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetSpecificUser } from "../../hooks/useGetSpecificUser";
import { useGetVisitType } from "./hooks/useGetVisitType";
import { useAssignPatient } from "./hooks/useAssignPatient";
import { useForm } from "react-hook-form";

const AssignPatient = () => {
  const { state: patient } = useLocation();
  const { data: doctors, error, isPending } = useGetSpecificUser("doctor");
  const { data: visitType } = useGetVisitType();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      //   doctor_id: "",
      //   visit_type_id: "",
      //   patient_id: patient.id,
      //   reason: "",
      assignment_date: new Date().toISOString().substring(0, 10),
    },
  });
  const { mutate } = useAssignPatient();
  //   console.log(patient);
  if (isPending) return <Spinner animation="grow" />;
  //   console.log(doctors);

  const submitHandler = (data) => {
    console.log(data);
    const assignData = { ...data, patient_id: patient.id };
    console.log(assignData);
    mutate(assignData);
  };
  return (
    <Container className="p-3 ">
      <div className="p-3  bg-hrun-box hrunboxshadow">
        <h5 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
          Assign patient
        </h5>
        <div className="d-flex gap-md-4 gap-2 flex-wrap mt-md-3 mb-md-2">
          <span>
            <span className="fw-bold me-2">Name:</span>
            {`${patient.firstName} ${patient.middleName}`}
          </span>
          <span>
            <span className="fw-bold me-2">Gender:</span>
            {patient.gender}
          </span>
          <span>
            <span className="fw-bold me-2">card No :</span>
            {patient?.card_number}
          </span>
          <span>
            <span className="fw-bold me-2">Age:</span>
            {differenceInYears(new Date(), parseISO(patient.birth_date))} years
          </span>
        </div>
        <div className="mt-4">
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Row>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Doctor</Form.Label>
                  <Form.Control
                    as="select"
                    // defaultValue="default"
                    {...register("doctor_id")}
                  >
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Visit Type</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="default"
                    {...register("visit_type_id")}
                  >
                    {visitType?.map((visit) => (
                      <option key={visit.id} value={visit.id}>
                        {visit.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* visit type etxt input reason */}
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="text"
                    // defaultValue="default"
                    placeholder="reason.."
                    {...register("reason")}
                  />
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Visit Date</Form.Label>
                  <Form.Control
                    type="date"
                    // defaultValue="default"
                    min={new Date().toISOString().substring(0, 10)}
                    placeholder="date.."
                    {...register("assignment_date")}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* submit button */}
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary px-5" type="submit">
                + Assign
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default AssignPatient;
