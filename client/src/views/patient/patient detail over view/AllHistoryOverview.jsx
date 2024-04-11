import { Accordion, Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { ContextAwareToggle } from "./ContextAwareToggle";
import { Link } from "react-router-dom";

const AllHistoryOverview = ({ historys }) => {
  // console.log("AllHistoryOverview re");

  return (
    <Accordion defaultActiveKey="0">
      {historys.map((history, index) => (
        <Card key={history._id} className="mb-2">
          <Card.Header>
            <ContextAwareToggle eventKey={index}>
              <div className="d-flex justify-content-between">
                {moment(history.createdAt).format("MM/DD/YYYY")}{" "}
                <Link
                  to={`/patients/history/${history._id}`}
                  /* onClick={(e) =>
                    navigate(`/patients/history/${history._id}`, {
                      replace: true,
                    })
                  } */
                  //replace
                  className="me-2"
                >
                  view detail
                </Link>
              </div>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
            <Card.Body className="px-4">
              <Row className="mb-0">
                <Col xs={3}>
                  <span>Chief complaint</span>
                </Col>
                <Col xs={1} className="d-flex justify-content-center">
                  <span className="fw-bold">:</span>
                </Col>
                <Col>{history?.chiefcomplaint}</Col>
              </Row>
              <hr />
              <Row>
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
              </Row>
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
      </Card>*/}
      {/*  <Card className="mb-2">
        <Card.Header>
          <ContextAwareToggle eventKey="10">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="10">
          <Card.Body>Hello! I am another body</Card.Body>
        </Accordion.Collapse>
      </Card> */}
    </Accordion>
  );
};

export default AllHistoryOverview;
