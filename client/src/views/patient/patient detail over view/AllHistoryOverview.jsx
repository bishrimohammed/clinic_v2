import { Accordion, Card, Col, Row, Table } from "react-bootstrap";
// import moment from "moment";
import { ContextAwareToggle } from "./ContextAwareToggle";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const AllHistoryOverview = ({ medicalRecords }) => {
  console.log(medicalRecords);
  // console.log("AllHistoryOverview re");
  // console.log(medicalRecords.medicalRecordDetails);
  // medicalRecords.medicalRecordDetails?.map((detail) => {
  //   console.log(detail);
  // });
  return (
    <Accordion defaultActiveKey="0">
      {medicalRecords.map((history, index) => (
        <Card key={history.id} className="mb-2">
          <Card.Header>
            <ContextAwareToggle eventKey={index}>
              <div className="d-flex justify-content-between">
                {format(new Date(history.createdAt), "yyyy-mm-d")}
                <Link
                  to={`/patients/history/${history.id}`}
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
              <div className="mb-0">
                <div className="d-flex justify-content-center mb-2">
                  <span>Chief complaint</span>
                </div>

                <Table striped bordered hover size="sm">
                  {/* <caption>Monthly savings</caption> */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Chief complaint</th>
                      <th>Doctor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history?.medicalRecordDetails?.map((detail, index) => (
                      <tr key={detail.id}>
                        {/* {console.log(detail)} */}
                        <td>{index + 1}</td>
                        <td>{detail.chief_complaint}</td>
                        <td>
                          {detail.doctor.employee.firstName}{" "}
                          {detail.doctor.employee.middleName}{" "}
                          {detail.doctor.employee.lastName}{" "}
                        </td>
                      </tr>
                    ))}
                    {/* <tr>
                      <td>1</td>
                      <td>{history?.medicalRecordDetails[0]?.chief_complaint}</td>
                      <td>
                        {history?.medicalRecordDetails[0]?.doctor.employee.firstName}{" "}
                        {history?.medicalRecordDetails[0]?.doctor.employee.middleName}{" "}
                        {history?.medicalRecordDetails[0]?.doctor.employee.lastName}
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
              </div>
              <div className="mb-0">
                <div className="d-flex justify-content-center mb-2">
                  <span> History of Present Illness(HPI)</span>
                </div>

                <Table striped bordered hover size="sm">
                  {/* <caption>Monthly savings</caption> */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>HPI</th>
                      <th>Doctor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history?.medicalRecordDetails?.map((detail, index) => (
                      <tr key={detail.id}>
                        {/* {console.log(detail)} */}
                        <td>{index + 1}</td>
                        <td>{detail.hpi}</td>
                        <td>
                          {detail.doctor.employee.firstName}{" "}
                          {detail.doctor.employee.middleName}{" "}
                          {detail.doctor.employee.lastName}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <hr />
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
        // <div></div>
      ))}
    </Accordion>
  );
};

export default AllHistoryOverview;
