/* eslint-disable react/prop-types */
import { differenceInYears } from "date-fns";
import React from "react";
import { Col, Row } from "react-bootstrap";

const PatientInfo = ({ patient }) => {
  // console.log("PatientInfo re rendered");
  return (
    <div
      style={{
        borderRadius: 15,
        // borderTop: `2px solid rgb(50, 31, 219)`,
        // borderLeft: `2px solid rgb(50, 31, 219)`,
        // borderRight: `2px solid rgb(50, 31, 219)`,
      }}
      className="bg-white h-100 px-3 py-3 "
    >
      <div className="bg-white text-center d-flex flex-column align-items-center justify-content-center"></div>
      <Row className="mb-1">
        <Col>
          <div className="d-flex  align-items-center">
            <h6 className="mb-0">Name : </h6>
            <p className="mb-0 ms-2">
              {patient.firstName} {patient.miidleName} {patient.lastname}{" "}
            </p>
          </div>
        </Col>
        <Col>
          <div className="d-flex  align-items-center">
            <h6 className="mb-0">Phone: </h6>
            <p className="mb-0 ms-2">{patient.phone}</p>
          </div>
        </Col>
        <Col>
          <div className="d-flex  align-items-center">
            <h6 className="mb-0">Card Number : </h6>
            <p className="mb-0  ms-2">{patient.card_number}</p>
          </div>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <div className="d-flex  align-items-center">
            <h6 className="mb-0">Status : </h6>
            <span className="ms-1">
              {patient.status ? " Active" : " inActive"}
            </span>
          </div>
        </Col>
        <Col>
          <div className="d-flex  align-items-center">
            <h6 className="mb-0">Age : </h6>
            <p className="mb-0 ms-2">
              {differenceInYears(new Date(), patient.birth_date)} Years old
            </p>
          </div>
        </Col>
        <Col>
          <div className="d-flex  align-items-center">
            <h6 className="mb-0">Gender : </h6>
            <span className="ms-1">{patient.gender}</span>
          </div>
        </Col>
      </Row>
      {/* <Row className="mb-1"></Row> */}
    </div>
  );
};

export default React.memo(PatientInfo);
