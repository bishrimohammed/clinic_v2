import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAgreements } from "./hooks/useGetAgreements";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import CompanyAgreements from "./agreements/CompanyAgreements";
import CompanyEmployee from "./employee/CompanyEmployee";
// import CompanyAgreements from "./agreements/CompanyAgreements";
import { IoMdArrowRoundBack } from "react-icons/io";
const CreditCompanyDetail = () => {
  const { state } = useLocation();
  const { data: agreements, isPending } = useGetAgreements(state.id);
  // console.log(agreements);
  const navigate = useNavigate();
  return (
    <div className="p-3">
      <div className=" p-2  d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h5 className="mb-0"> Company Agreement detail</h5>
      </div>
      <hr />
      {/* react bootstrap tabs */}
      {/* <div className="d-flex justify-content-between"></div> */}
      <Row className="mt-2">
        <Col className="px-4">
          <p className="mb-0 text-muted fw-bold">Company Name</p>
          <p className="small">{state.name}</p>
        </Col>
        <Col className="px-4">
          <p className="mb-0 text-muted fw-bold">Phone</p>
          <p className="small ">{state.address?.phone_1}</p>
        </Col>
        <Col className="px-4">
          <p className="mb-0 text-muted fw-bold">Email</p>
          <p className="small ">{state.address?.email}</p>
        </Col>
      </Row>
      <Row className="">
        <Col className="px-4">
          <p className="mb-0 text-muted fw-bold">Representative Name</p>
          <p className="small">{state.representative_name}</p>
        </Col>
        <Col className="px-4">
          {/* <p className="mb-0 text-muted fw-bold">Representative Phone</p>
          <p className="small">{state.representative_phone}</p> */}
        </Col>
        {/* <Col className="px-4">
          <p className="mb-0 text-muted fw-bold">Email</p>
          <p className="small ">{state.address?.email}</p>
        </Col> */}
      </Row>
      <Tabs defaultActiveKey="Agreements" variant="underline">
        <Tab eventKey="Agreements" title="Agreements">
          <CompanyAgreements agreements={agreements} isPending={isPending} />
        </Tab>
        <Tab eventKey="Employees" title="Employees">
          <CompanyEmployee />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CreditCompanyDetail;
