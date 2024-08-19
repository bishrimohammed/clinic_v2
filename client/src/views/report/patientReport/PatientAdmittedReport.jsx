import React from "react";
import { Table } from "react-bootstrap";

const PatientAdmittedReport = ({ admittedReport }) => {
  const { visits, start, end } = admittedReport;
  console.log(admittedReport);
  return (
    <div>
      {" "}
      <h4>Patient Admitted Report</h4>
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

export default PatientAdmittedReport;
