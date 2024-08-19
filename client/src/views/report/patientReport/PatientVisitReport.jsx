import React from "react";
import { Table } from "react-bootstrap";

const PatientVisitReport = ({ visitedReport }) => {
  const { visits, start, end } = visitedReport;
  console.log(visitedReport);
  return (
    <div>
      <h3>Patient Visited Report</h3>
      <p>
        From: {start} To: {end}
      </p>
      <hr />

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Visit Date</th>
            <th>Visit Type</th>

            {/* <th>Total Payments</th> */}
          </tr>
        </thead>
        <tbody>
          {visits?.map((visit, index) => (
            <tr key={visit.id}>
              <td>{index + 1}</td>
              <td>
                {visit.patient.firstName +
                  " " +
                  visit.patient.middleName +
                  " " +
                  visit.patient.lastName}
              </td>

              <td>{visit.assignment_date} </td>
              <td>{visit.visit_type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientVisitReport;
