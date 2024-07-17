import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetDoctors } from "../Scheduling/hooks/useGetDoctors";
// import { useGetPatientForSelect } from "../patient/hooks/patientHooks/useGetPatientForSelect";
import { format } from "date-fns";
import { useAddPatientVisit } from "./hooks/useAddPatientVisit";

import { IoSearch } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";
import { useSearchPatient } from "../patient/hooks/patientHooks/useSearchPatient";
const visitSchema = yup.object().shape({
  patient_id: yup.string(),
  card_Number: yup.string().required("Patient is required"),
  patient_name: yup.string(),
  phone: yup.number(),
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
  reason: yup.string().transform((value) => value.trim()),
  type: yup.string().required("Visit Type is required"),
  mode_of_arrival: yup.string().when("type", ([type], schema) => {
    if (type === "Emergency") {
      return schema.required("Mode of arrival is required");
    }
    return schema.nullable();
  }),
});
const AddPatientVisitModal = ({ show, handleClose }) => {
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
  // console.log(patients);
  const [showInnerModal, setShowInnerModal] = useState(false);
  //   console.log(doctors);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(visitSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    },
  });
  // console.log(searchQuery);
  // console.log(errors);
  const { mutateAsync, isPending } = useAddPatientVisit();
  const [errorState, setErrorState] = useState("");
  const visitDateWatcher = watch("date");
  const vistiTypeWatcher = watch("type");
  // console.log(visitDateWatcher);
  const DoctorList = useMemo(() => {
    if (visitDateWatcher) {
      const weekdayNumber = new Date(visitDateWatcher).getDay();
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      // console.log(visitDateWatcher.substring(11, 16) + ":00");
      // console.log(weekday[weekdayNumber]);
      return doctors?.filter((doctor) => {
        return doctor?.schedules?.find(
          (availability) =>
            availability.day_of_week === weekday[weekdayNumber] &&
            availability.start_time <=
              visitDateWatcher.substring(11, 16) + ":00" &&
            availability.end_time >= visitDateWatcher.substring(11, 16) + ":00"
        );
      });
    } else {
      return [];
    }
  }, [visitDateWatcher]);
  // console.log(DoctorList);
  const submitHandler = (data) => {
    // console.log(data);
    // return;

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
          <Modal.Title>Add Visits </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorState && (
            <Alert variant="danger" dismissible>
              {errorState}
            </Alert>
          )}
          {/* <button >show</button> */}
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Row>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Patient Id</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      disabled
                      {...register("card_Number")}
                      // defaultValue={new Date().toISOString().slice(0, 16)}
                      isInvalid={errors.card_Number}
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
                    <button
                      type="button"
                      onClick={() => setShowInnerModal(true)}
                      className="border-0 bg-transparent"
                    >
                      <IoSearch size={20} />
                    </button>
                  </div>
                  <span className=" text-danger">
                    {errors.card_Number?.message}
                  </span>
                  {/* <Form.Control.Feedback type="invalid">
                    {errors.patient_id?.message}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("patient_name")}
                    disabled
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
                    type="text"
                    {...register("phone")}
                    disabled={true}
                    // defaultValue={new Date().toISOString().slice(0, 16)}
                    // isInvalid={errors.patient_name}
                    onChange={(e) =>
                      handleSearchQueryChange("patientName", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Visit Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    {...register("date", {
                      onChange: (e) => {
                        // console.log(format(new Date(), "HH:mm"));
                        const dateTime = e.target.value;
                        const date = dateTime.substring(0, 10);
                        const time = dateTime.substring(11, 16);
                        // console.log(time);
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
                    // defaultValue={new Date().toISOString().substring(0, 16)}
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
                  <Form.Label>Assigned Doctor</Form.Label>
                  <Form.Select
                    {...register("doctor_id")}
                    isInvalid={errors.doctor_id}
                    aria-label="Default select example"
                  >
                    <option value="">Select Doctor</option>
                    {DoctorList?.map((doctor, index) => (
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
              {vistiTypeWatcher === "Emergency" && (
                <Col md={4} sm={12} className="mb-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Mode of Arrival</Form.Label>
                    <Form.Select
                      {...register("mode_of_arrival")}
                      isInvalid={errors.mode_of_arrival}
                      aria-label="Default select example"
                    >
                      {/* Ambulance, Private car, Public car and Walking */}
                      <option value="">Please Select</option>
                      <option value="Ambulance">Ambulance</option>
                      <option value="Private car">Private car</option>
                      <option value="Public car">Public car</option>
                      <option value="Walking">Walking</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.mode_of_arrival?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

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
              <Button disabled={isPending} type="submit" variant="primary">
                {isPending && <Spinner size="sm" animation="border" />}
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
                      setValue("card_Number", patient.card_number);
                      setValue(
                        "patient_name",
                        patient.firstName +
                          " " +
                          patient.middleName +
                          " " +
                          patient.lastName
                      );
                      setValue("phone", patient.phone);
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

export default AddPatientVisitModal;
