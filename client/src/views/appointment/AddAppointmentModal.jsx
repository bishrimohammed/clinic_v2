import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetDoctors } from "../Scheduling/hooks/useGetDoctors";
import { useAddAppointment } from "./hooks/useAddAppointment";
import { useGetPatientForSelect } from "../patient/hooks/patientHooks/useGetPatientForSelect";
import useDebounce from "../../hooks/useDebounce";
import { useSearchPatient } from "../patient/hooks/patientHooks/useSearchPatient";
import { IoSearch } from "react-icons/io5";
const appointmentSchema = yup.object().shape({
  patient_id: yup.number(),
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
  reason: yup.string().transform((value) => value.trim()),
  type: yup.string().required("Appointment Type is required"),
});
const AddAppointmentModal = ({ show, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState({
    patientId: "",
    patientName: "",
    phone: "",
  });
  const debounce = useDebounce(searchQuery, 2000);
  const { data: doctors } = useGetDoctors();
  const {
    data: patients,
    isPending: fetchingpatient,
    isFetching,
  } = useSearchPatient(debounce);
  // console.log(doc tors);
  const { mutateAsync, isPending } = useAddAppointment();
  const [showInnerModal, setShowInnerModal] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
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
  const appointmentDateWatcher = watch("date");
  const appointmentTimeWatcher = watch("time");
  // console.log(appointmentDateWatcher);

  // create memo value that filter doctors avaliable at this appointment date and time

  const DoctorList = useMemo(() => {
    if (appointmentDateWatcher && appointmentTimeWatcher) {
      const weekdayNumber = new Date(appointmentDateWatcher).getDay();
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      // console.log(weekday[weekdayNumber]);
      return doctors?.filter((doctor) => {
        return doctor?.schedules?.find(
          (availability) =>
            availability.day_of_week === weekday[weekdayNumber] &&
            availability.start_time <= appointmentTimeWatcher &&
            availability.end_time >= appointmentTimeWatcher
        );
      });
    } else {
      return [];
    }
  }, [appointmentDateWatcher, appointmentTimeWatcher]);
  // console.log(DoctorList);
  const submitHandler = (data) => {
    const Data = {
      type: data.type,
      reason: data.reason,
      patient_id: data.patient_id ? data.patient_id : null,
      patient_name: data.patient_name,
      time: data.time,
      date: data.date,
      doctor_id: data.doctor_id,
    };
    // console.log(Data);
    // return;
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 201) {
          handleClose(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorState(err?.response?.data?.message);
      });
  };
  // console.log(errors);
  const handleSearchQueryChange = (field, value) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
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
                <Form.Group>
                  <Form.Label>Patient Name</Form.Label>

                  <div className="d-flex align-items-center">
                    <Form.Control
                      list="patients"
                      // as="select"
                      {...register("patient_name")}
                      isInvalid={errors.patient_name}
                      // isInvalid={errors.patient_id}
                    ></Form.Control>
                    <button
                      type="button"
                      onClick={() => setShowInnerModal(true)}
                      className="border-0 bg-transparent"
                    >
                      <IoSearch size={20} />
                    </button>
                  </div>
                  <span className=" text-danger">
                    {errors.patient_name?.message}
                  </span>
                  {/* <Form.Control.Feedback type="invalid">
                    {errors.patient_id?.message}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Col>
              {/* <Col md={4} sm={12} className="mb-2">
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
            </Col> */}
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
                        // console.log(e.target.value);
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

                        // console.log(format(new Date(), "HH:mm"));
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
                    {DoctorList?.map((doctor, index) => (
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
              <Button disabled={isPending} type="submit" variant="primary">
                {isPending && <Spinner size="sm" />}
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showInnerModal}
        onHide={() => setShowInnerModal(false)}
        centered
        size="md"
        className="hrunboxshadow hrunbox border-dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Search Patient </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Patient Id</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      handleSearchQueryChange("patientId", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    // {...register("patient_name")}
                    // defaultValue={new Date().toISOString().slice(0, 16)}
                    // isInvalid={errors.patient_name}
                    onChange={(e) =>
                      handleSearchQueryChange("patientName", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    // {...register("visit_date")}
                    // defaultValue={new Date().toISOString().slice(0, 16)}
                    // isInvalid={errors.visit_date}

                    onChange={(e) =>
                      handleSearchQueryChange("phone", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <div style={{ height: 200, overflowY: "auto" }}>
            <Table responsive striped bordered className="mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Id</th>
                  <th>Patient Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {isFetching && (
                  <tr>
                    <td className="  align-items-center" colSpan="8">
                      <span>
                        <Spinner animation="border" size="sm" />
                      </span>
                    </td>
                  </tr>
                )}
                {patients?.map((patient, index) => (
                  <tr
                    key={patient.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setValue("patient_id", patient.id);
                      setValue(
                        "patient_name",
                        patient.firstName +
                          " " +
                          patient.middleName +
                          " " +
                          patient.lastName
                      );
                      // setValue("phone", patient.phone);
                      setShowInnerModal(false);
                      setSearchQuery({
                        patientId: "",
                        patientName: "",
                        phone: "",
                      });
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{patient.card_number}</td>
                    <td>
                      {patient.firstName} {patient.middleName}{" "}
                      {patient.lastName}
                    </td>
                    <td>{patient.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAppointmentModal;
