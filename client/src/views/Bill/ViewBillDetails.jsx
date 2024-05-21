import { differenceInYears } from "date-fns";
import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CurrentDuesPaymentTable from "./payment detail/CurrentDuesPaymentTable";
import PreviousPaymentTable from "./payment detail/PreviousPaymentTable";
import { IoMdArrowRoundBack } from "react-icons/io";

const ViewBillDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className=" d-flex border-bottom p-2 mb-3 gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h4 className="mb-0">View Patient Payment Details</h4>
      </div>
      {/* <h4 className="border-bottom p-2 mb-3">View Patient Payment Details</h4> */}
      <div style={{ height: 150 }} className="d-flex gap-2  p-2">
        <div
          style={{ flex: 66, boxShadow: "0px 3px 2px 0px rgba(0,0,0,0.1)" }}
          className="p-2 "
        >
          <Row>
            <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">Patient Name: </h6>
                <p className="mb-0 ms-2">
                  {state.patient.firstName +
                    " " +
                    state.patient.middleName +
                    " " +
                    state.patient.lastName}
                </p>
              </div>
            </Col>
            <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">Patient Id: </h6>
                <p className="mb-0 ms-2">{state.patient.card_number}</p>
              </div>
            </Col>
            <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">Sex: </h6>
                <p className="mb-0 ms-2">{state.patient.gender}</p>
              </div>
            </Col>
            <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">is Credit: </h6>
                <p className="mb-0 ms-2">
                  {state.patient.is_credit ? "Yes" : "No"}
                </p>
              </div>
            </Col>
            <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">Age: </h6>
                <p className="mb-0 ms-2">
                  {differenceInYears(new Date(), state.patient.birth_date)}{" "}
                  years
                </p>
              </div>
            </Col>
            {/* <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">Phone: </h6>
                <p className="mb-0 ms-2">{state.patient.phone}</p>
              </div>
            </Col> */}
            <Col sm={6} className="mb-2">
              <div className="d-flex align-items-center">
                <h6 className="mb-0">Status: </h6>
                <p className="mb-0 ms-2">
                  {state.patient.status ? (
                    <span className="fw-bold text-success">Active</span>
                  ) : (
                    "Inactive"
                  )}
                </p>
              </div>
            </Col>
            {/* <div className="d-flex align-items-center">
              <h6 className="mb-0">Phone: </h6>
              <p className="mb-0 ms-2">0123456789</p>
            </div> */}
          </Row>
        </div>
        <div style={{ flex: 33 }} className="p-2 ">
          {/* <h4>View Bill Details</h4> */}
        </div>
      </div>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        variant="underline"
        className="mb-3 mt-3 border-bottom gap-5 "
      >
        <Tab eventKey="home" title="Current Dues Payments">
          <CurrentDuesPaymentTable payments={state.payments} />
        </Tab>
        <Tab eventKey="profile" title="Previous Payment History">
          <PreviousPaymentTable />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default ViewBillDetails;
