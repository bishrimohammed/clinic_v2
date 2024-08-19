import React from "react";
import { Table } from "react-bootstrap";

const PatientSeenPerDoctor = ({ patientSeenReport }) => {
  const { visits, start, end } = patientSeenReport;
  //   console.log(patientSeenReport);
  return (
    <div>
      {" "}
      <h4>Patient Seen Per Doctor Report</h4>
      <p>
        From: {start} To: {end}
      </p>
      <hr />
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Total Patient</th>
            {/* <th>Visit Type</th> */}

            {/* <th>Total Payments</th> */}
          </tr>
        </thead>
        <tbody>
          {visits?.map((visit, index) => (
            <tr key={visit.doctor_id}>
              <td>{index + 1}</td>
              <td>
                {visit.doctor.employee.firstName +
                  " " +
                  visit.doctor.employee.middleName +
                  " " +
                  visit.doctor.employee.lastName}
              </td>

              <td>{visit.patient_count} </td>
              {/* <td>{visit.visit_type}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientSeenPerDoctor;
