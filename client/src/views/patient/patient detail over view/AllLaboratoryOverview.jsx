import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { ContextAwareToggle } from "./ContextAwareToggle";
import moment from "moment";

const AllLaboratoryOverview = ({ laboratorys }) => {
  // console.log(laboratorys);
  //const groupByOrderTime
  return (
    <div>
      {/*  AllLaboratoryOverview{" "}
      {laboratorys[0].investigations.map((lab, index) => (
        <div key={index}>{lab.test_name}</div>
      ))} */}
      <Accordion defaultActiveKey="0">
        {laboratorys.map((lab, index) => (
          <Card key={lab._id} className="mb-2">
            <Card.Header>
              <ContextAwareToggle eventKey={index}>
                {moment(lab.orderTime).format("MM/DD/YYYY")}
              </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body className="px-sm-4 px-1">
                <div className="d-flex mb-0">
                  <div /* xs={3} md={2} */ /* xl={1} xs={3} */ className="">
                    <span>Tests : </span>
                  </div>
                  {/* <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col> */}
                  <div className="ps-0">
                    <ol>
                      {lab.investigations.map((lab, index) => (
                        <li key={index}>{lab.test_name}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* <Row>
                  <Col xs={3}>
                    <span className="text-nowrap">
                      History of Present Illness
                    </span>
                  </Col>
                  <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col>
                  <Col className="ps-0">{history?.HPI}</Col>
                  <Col xs={1}></Col>
                </Row> */}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
        {/* <Card className="mb-2">
        <Card.Header>
          <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I am the body</Card.Body>
        </Accordion.Collapse>
      </Card>
       <Card className="mb-2">
        <Card.Header>
          <ContextAwareToggle eventKey="10">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="10">
          <Card.Body>Hello! I am another body</Card.Body>
        </Accordion.Collapse> 
      </Card> */}
      </Accordion>
    </div>
  );
};

export default AllLaboratoryOverview;
