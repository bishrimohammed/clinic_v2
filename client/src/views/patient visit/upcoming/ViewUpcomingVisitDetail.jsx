import { differenceInYears } from "date-fns";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import AddVitalSignModal from "../AddVitalSignModal";
const ViewUpcomingVisitDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  //   console.log(state);
  const [showAddVitalSignModal, setShowAddVitalSignModal] = useState(false);
  return (
    <div>
      {/* <h1>ViewUpcomingVisitDetail</h1> */}
      <div className="mb-2 d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h4>View Patient Visit Detail</h4>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Button
          className="me-md-3"
          onClick={() => setShowAddVitalSignModal(true)}
        >
          + Add Vital Sign
        </Button>
      </div>
      <Row className="px-3">
        <Col md={4} sm={12} className="px-4 d-flex ">
          <p className="mb-0 text-muted fw-bold">Patient Name : </p>
          <p className="ms-2 mb-0">
            {state.patient?.firstName} {state.patient?.middleName}{" "}
            {state.patient?.lastName}
          </p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Card Number: </p>
          <p className="ms-2 ">{state.patient.card_number}</p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Age: </p>
          <p className="ms-2 ">
            {differenceInYears(new Date(), state.patient?.birth_date)} Years old
          </p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Gender: </p>
          <p className="ms-2 ">{state.patient?.gender}</p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Examiner: </p>
          <p className="ms-2 ">
            {state.doctor?.employee?.firstName}{" "}
            {state.doctor?.employee?.middleName}{" "}
            {state.doctor?.employee?.lastName}
          </p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Visit Date: </p>
          <p className="ms-2 ">{state.assignment_date}</p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Visit Time: </p>
          <p className="ms-2 ">{state.visit_time}</p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Visit Type: </p>
          <p className="ms-2 ">{state.visit_type}</p>
        </Col>

        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Status: </p>
          <p className="ms-2 ">{state.status ? "Active" : "Inactive"}</p>
        </Col>
        <Col md={4} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Stage:</p>
          <p className="ms-2 ">{state.stage}</p>
        </Col>
        <Col md={6} sm={12} className="d-flex px-4">
          <p className="mb-0 text-muted fw-bold">Reason: </p>
          <p className="ms-2 ">{state.reason}</p>
        </Col>
      </Row>
      {showAddVitalSignModal && (
        <AddVitalSignModal
          handleClose={() => setShowAddVitalSignModal(false)}
          show={showAddVitalSignModal}
          // patient={state.patient}
          // doctor={state.doctor}
          // assignment_date={state.assignment_date}
          // visit_time={state.visit_time}
          // visit_type={state.visit_type}
          // status={state.status}
          // stage={state.stage}
          // reason={state.reason}
        />
      )}
    </div>
  );
};

export default ViewUpcomingVisitDetail;
