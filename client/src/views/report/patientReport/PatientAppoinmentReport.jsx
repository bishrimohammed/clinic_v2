import React from "react";
import { Table } from "react-bootstrap";

const PatientAppoinmentReport = ({ appointmentReport }) => {
  const { appointments, start, end } = appointmentReport;
  //   console.log(start);
  return (
    <div>
      <h3>Patient Appoinment Report</h3>
      <p>
        From: {start} To: {end}
      </p>
      <hr />

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Appoinment Date</th>
            <th>Appoinment Type</th>

            {/* <th>Total Payments</th> */}
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>
                {appointment.patient
                  ? appointment.patient.firstName +
                    " " +
                    appointment.patient.middleName +
                    " " +
                    appointment.patient.lastName
                  : appointment.patient_name}
              </td>

              <td>{appointment.appointment_date} </td>
              <td>{appointment.appointment_type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientAppoinmentReport;
