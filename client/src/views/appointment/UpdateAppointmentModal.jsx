import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useUpdateAppointment } from "./hooks/useUpdateAppointment";
import { useGetDoctors } from "../Scheduling/hooks/useGetDoctors";
import * as yup from "yup";

const appointmentSchema = yup.object().shape({
  patient_id: yup.string(),
  doctor_id: yup.string().required("Doctor is required"),
  date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .nullable()
    .required("Appointment date is required"),
  time: yup.string().required("Appointment time is required"),
  // doctor_name: yup.string().required("doctor_name is required"),
  patient_name: yup
    .string()
    .transform((value) => value.trim())
    .required("Patient name is required"),
  reason: yup
    .string()
    .transform((value) => value.trim())
    .required("Reason is required"),
  type: yup.string().required("Appointment Type is required"),
});
const UpdateAppointmentModal = ({ show, handleClose, appointment }) => {
  const { data: doctors } = useGetDoctors();
  // console.log(appointment);
  const [errorState, setErrorState] = useState("");
  const { mutateAsync } = useUpdateAppointment();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      patient_name: appointment.patient_name,
      doctor_id: appointment.doctor_id,
      date: appointment.appointment_date,
      time: appointment.appointment_time,
      reason: appointment.reason,
      type: appointment.type,
    },
    resolver: yupResolver(appointmentSchema),
  });
  const appointmentDateWatcher = watch("date");
  useEffect(() => {
    if (errorState) {
      const timeoutId = setTimeout(() => {
        setErrorState("");
      }, 5000);

      // Clean up the timeout when the effect is re-run or unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [errorState]);

  // console.log(appointmentDateWatcher);
  const submitHandler = (data) => {
    console.log(data);
    const Data = {
      formData: data,
      appointmentId: appointment.id,
    };
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorState(err?.response?.data?.message);
      });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState && (
          <Alert variant="danger" dismissible>
            {" "}
            {errorState}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  {...register("patient_name")}
                  type="text"
                  placeholder="Enter Patient Name"
                  isInvalid={errors.patient_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patient_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  {...register("date")}
                  //   placeholder="Enter username"
                  min={new Date().toISOString().substring(0, 10)}
                  isInvalid={errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Appointment Time</Form.Label>
                <Form.Control
                  type="time"
                  //   min={new Date().toISOString().slice(11, 16)}
                  {...register("time", {
                    onChange: (e) => {
                      console.log(e.target.value);
                      if (!appointmentDateWatcher) {
                        if (e.target.value < format(new Date(), "HH:mm")) {
                          setError("time", {
                            type: "manual",
                            message: "time must be greater than current time",
                          });
                          // e.target.value = format(new Date(), "HH:mm");
                        } else if (errors.time) {
                          // setError("time", null);
                          // errors.time = null;
                          clearErrors("time");
                          // e.target.value = format(new Date(), "HH:mm");
                        }
                      } else {
                        if (
                          e.target.value < format(new Date(), "HH:mm") &&
                          appointmentDateWatcher ===
                            new Date().toISOString().substring(0, 10)
                        ) {
                          setError("time", {
                            type: "manual",
                            message: "time must be greater than current time",
                          });
                          // e.target.value = format(new Date(), "HH:mm");
                        } else if (errors.time) {
                          // setError("time", null);
                          // errors.time = null;
                          clearErrors("time");
                          // e.target.value = format(new Date(), "HH:mm");
                        }
                      }

                      console.log(format(new Date(), "HH:mm"));
                    },
                  })}
                  isInvalid={errors.time}
                  //   step="10000"
                  //   min={format(new Date(), "HH:mm")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.time?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  {...register("doctor_id")}
                  isInvalid={errors.doctor_id}
                >
                  <option value="">Please Select</option>
                  {doctors?.map((doctor, index) => (
                    <option key={index} value={doctor.id}>
                      {doctor.employee.firstName} {doctor.employee.middleName}{" "}
                      {doctor.employee.lastName}
                    </option>
                  ))}
                  {/* <option value="name1">name 1</option>
                  <option value="name 2">name 2</option> */}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.doctor_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Appointment Type</Form.Label>
                <Form.Select {...register("type")}>
                  <option value="Visit">Visit</option>
                  <option value="Follow up">Follow up</option>
                  <option value="Procedure">Procedure</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  {...register("reason")}
                  as="textarea"
                  isInvalid={errors.reason}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reason?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default UpdateAppointmentModal;
