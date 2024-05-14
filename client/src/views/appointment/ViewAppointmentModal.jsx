import { format, parse } from "date-fns";
import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

const ViewAppointmentModal = ({ show, handleClose, appointment }) => {
  return (
    // <Modal show={show} onHide={handleClose}>

    // </Modal>
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Appointment Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Patient Name</p>
            <p className="small">{appointment.patient_name}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Doctor Name</p>
            <p className="small">
              {appointment.doctor.employee.firstName}{" "}
              {appointment.doctor.employee.middleName}{" "}
              {appointment.doctor.employee.lastName}
            </p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Appointment Date</p>
            <p className="small">{appointment.appointment_date}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Appointment Time</p>
            <p className="small">
              {format(
                parse(appointment.appointment_time, "HH:mm:ss", new Date()),
                "h:mm a"
              )}
            </p>
          </Col>

          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Appointment Type</p>
            <p className="small">{appointment.appointment_type}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Status</p>
            <p className="small">{appointment.status}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Reason</p>
            <p className="small">{appointment.reason}</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewAppointmentModal;
