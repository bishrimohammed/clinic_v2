import React from "react";
import { Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
// import { formatHour } from "../../../../utils/formatDate";
const ViewLabResult = () => {
  const { state } = useLocation();
  console.log(state);
  // return;
  return (
    <Container>
      <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
        Lab results
      </h6>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Result</th>
            {/* <th>ABN</th> */}
            <th>Comment</th>
            <th>requestedBy</th>
            <th>reportedBy</th>
            <th>Order Time</th>
            <th>Report Time</th>
          </tr>
        </thead>
        <tbody>
          {state.orderedTests.map((t, index) => (
            <tr key={index}>
              <td>{t.test.service_name}</td>
              <td>{t.result}</td>
              {/* <td>ABN</td> */}
              {/* <td>{t.referenceRange}</td> */}
              {/* <td>{t.unit}</td> */}
              <td>{t.comment}</td>
              <td>
                {t.requestedBy.firstName} {t.requestedBy.lastName}
              </td>
              <td>
                {t.reportedBy.firstName} {t.reportedBy.lastName}
              </td>

              <td>
                {format(t.order_time, "yyyy-MM-dd")}{" "}
                {format(t.order_time, "h:mm aa")}
              </td>
              <td>
                {format(t.report_time, "yyyy-MM-dd")} {""}
                {format(t.report_time, "h:mm aa")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewLabResult;
