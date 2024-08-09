import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Lab from "../patient/consultation/plan/Lab";
import { useGetDoctors } from "../Scheduling/hooks/useGetDoctors";
import Procedure from "./Procedure";
import { useCreateExternalService } from "./hooks/useCreateExternalService";
// import Procedure from "../../../../api/models/medicalRecords/Procedure";

const externalServiceSchema = yup.object().shape({
  patient_name: yup.string().required("Patient name is required"),
  service_type: yup.string().required("Service type is required"),
  examiner: yup.string().when("service_type", ([service_type], schema) => {
    if (service_type === "procedure") {
      return schema.required("Examiner is required");
    }
    return schema.nullable();
  }),
  service_time: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .nullable()
    .required("External service time is required"),
  reason: yup.string(),
  selectedLabs: yup.array().of(yup.number()),
  indirectlySelectedLabs: yup.array().of(yup.number()),
  procedure: yup.number(),
});
const AddExternalServiceModal = ({ show, handleClose }) => {
  const { data: doctors } = useGetDoctors();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(externalServiceSchema),
  });
  console.log(errors);
  const { mutateAsync, isPending } = useCreateExternalService();
  const ServiceTimeWatcher = watch("service_time");
  const serviceTypeWatcher = watch("service_type");
  const DoctorList = useMemo(() => {
    if (ServiceTimeWatcher) {
      const weekdayNumber = new Date(ServiceTimeWatcher).getDay();
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      // console.log(ServiceTimeWatcher.substring(11, 16) + ":00");
      // console.log(weekday[weekdayNumber]);
      return doctors?.filter((doctor) => {
        return doctor?.schedules?.find(
          (availability) =>
            availability.day_of_week === weekday[weekdayNumber] &&
            availability.start_time <=
              ServiceTimeWatcher.substring(11, 16) + ":00" &&
            availability.end_time >=
              ServiceTimeWatcher.substring(11, 16) + ":00"
        );
      });
    } else {
      return [];
    }
  }, [ServiceTimeWatcher]);

  const submitHandler = (data) => {
    // console.log(data);
    const formData = {
      externalService: {
        patient_name: data.patient_name,
        service_type: data.service_type,
        // examiner: data.examiner,
        examiner: data.service_type === "procedure" ? data.examiner : null,
        service_time: data.service_time,
        reason: data.reason,
      },
      selectedLabs: data.service_type === "lab" ? data.selectedLabs : null,
      indirectlySelectedLabs:
        data.service_type === "lab" ? data.indirectlySelectedLabs : null,
      procedure: data.service_type === "procedure" ? data.procedure : null,
    };
    mutateAsync(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add External Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)} id="externalservice">
          <Row>
            <Col md={4}>
              <Form.Group controlId="patient_name" className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter patient name"
                  {...register("patient_name")}
                  isInvalid={!!errors.patient_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patient_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="service_type" className="mb-3">
                <Form.Label>Service Type</Form.Label>
                <Form.Select
                  //   as="select"
                  {...register("service_type")}
                  isInvalid={!!errors.service_type}
                >
                  <option value="">Select service type</option>
                  <option value="procedure">Procedure</option>
                  <option value="lab"> Lab </option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Service Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  {...register("service_time")}
                  isInvalid={!!errors.service_time}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.service_time?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {serviceTypeWatcher === "procedure" && (
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Examiner</Form.Label>
                  <Form.Select
                    {...register("examiner")}
                    isInvalid={errors.examiner}
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
                    {errors.examiner?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}

            <Col md={4}>
              <Form.Group controlId="reason" className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter reason"
                  {...register("reason")}
                  isInvalid={!!errors.reason}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reason?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {/* <Lab getValues={getValues} setValue={setValue} />
        <Procedure setValue={setValue} getValues={getValues} /> */}
        {serviceTypeWatcher === "procedure" && (
          <Procedure getValues={getValues} setValue={setValue} />
        )}
        {serviceTypeWatcher === "lab" && (
          <Lab getValues={getValues} setValue={setValue} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="externalservice"
          variant="primary"
          disabled={isPending}
          //   onClick={handleClose}
        >
          {isPending && <Spinner size="sm" />}
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExternalServiceModal;
