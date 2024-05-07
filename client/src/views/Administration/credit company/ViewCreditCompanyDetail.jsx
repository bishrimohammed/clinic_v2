import { format } from "date-fns";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Host_URL } from "../../../utils/getHost_URL";

const ViewCreditCompanyDetail = ({ show, handleClose, company }) => {
  // console.log(company);
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title> Company Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="border-bottom border-dark pt-2 py-2 ps-2 mx-3 mb-3 fw-bolder">
          Company Information
        </h6>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Company Name</p>
            <p className="small">{company.name}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Phone</p>
            <p className="small">{company?.address?.phone_1}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">TIN</p>
            <p className="small">{company.tin}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Status</p>
            <p className="small">{company.status ? "open" : "closed"}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Email</p>
            <p className="small ">{company.address.email}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">
              Company Representative Name
            </p>
            <p className="small">{company.representative_name}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">
              Company Representative Phone
            </p>
            <p className="small ps-1">
              {/* {company.unit ? (
                company.unit
              ) : (
                <span className="text-danger">__</span>
              )} */}
              {company.representative_phone}
            </p>
          </Col>
          <Col sm={6} className="px-4">
            {/* <p className="mb-0 text-muted fw-bold">Status</p>
            <p className="small">{company.status ? "Active" : "Inactive"}</p> */}
          </Col>
        </Row>
        <h6 className="border-bottom border-dark pt-2 py-2 ps-2 mx-3 mb-3 fw-bolder">
          Company Address Information
        </h6>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Region</p>
            <p className="small">
              {company.address?.woreda?.SubCity?.city?.region?.name}
            </p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">City</p>
            <p className="small ">
              {company.address?.woreda?.SubCity?.city?.name}
            </p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Subcity</p>
            <p className="small">
              {company.address?.woreda?.SubCity?.subCity_name}
            </p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Woreda</p>
            <p className="small ">{company.address?.woreda?.name}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Street</p>
            <p className="small mb-0">
              {company.address?.street_name ? (
                company.address?.street_name
              ) : (
                <span className="text-danger w-100 fw-bold">___</span>
              )}
            </p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">House Number</p>
            <p className="small mb-0">
              {company.address?.house_number ? (
                company.address?.house_number
              ) : (
                <span className="text-danger w-100 fw-bold">___</span>
              )}
            </p>
          </Col>
        </Row>
        <h6 className="border-bottom border-dark py-2 ps-2 mx-3 mb-3 fw-bolder">
          Active Agreement Information
        </h6>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold ">Start Date</p>
            <p className="small">
              {format(company?.agreements[0]?.start_date, "MM/dd/yyyy")}
            </p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Expiration Date</p>
            <p className="small ">
              {format(company?.agreements[0]?.end_date, "MM/dd/yyyy")}
            </p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold ">Maximum Limit</p>
            <p className="small">{company?.agreements[0]?.max_limit}</p>
          </Col>
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Agreement Doc</p>
            {/* <a
              //   href={Host_URL + company.agreements[0]?.agreement_doc}
              target="_blank"
              className="small "
              download={Host_URL + company.agreements[0]?.agreement_doc}
            >
              file
            </a> */}
            <Button
              //className="downloadbtn"
              type="submit"
              href={Host_URL + company.agreements[0]?.agreement_doc}
              target="_blank"
              bsPrefix="downloadbtn"
            >
              File
            </Button>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="px-4">
            <p className="mb-0 text-muted fw-bold">Status</p>
            <p className="small">
              {company?.agreements[0]?.status ? "Active" : "Closed"}
            </p>
          </Col>
          <Col className="px-4">
            {/* <p className="mb-0 text-muted fw-bold">Status</p>
                <p className="small">{company?.status ? "Active":""}</p> */}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose(false)}>Close</Button>
        {/* <Button onClick={() => handleClose(false)}>Update</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCreditCompanyDetail;
