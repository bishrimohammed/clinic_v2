import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UseGetLabRequested } from "./hooks/UseGetLabRequested";

const LabRequestedList = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = UseGetLabRequested();
  // console.log(data);
  // return;
  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error... + {error.message}</div>;
  return (
    <Container>
      <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
        Pending Lab
      </h6>
      <Table striped bordered>
        <thead>
          <tr>
            {/* <th>Date</th> */}
            <th>Patient</th>

            <th>tests</th>

            <th>status</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 &&
            data.map((lab, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/patients/history/${lab.medicalRecord.id}/addlabresult`,
                    { state: lab }
                  )
                }
              >
                {/* <td>{new Date()}</td> */}
                <td>
                  {lab.medicalRecord.patient.firstName}{" "}
                  {lab.medicalRecord.patient.middleName}{" "}
                </td>
                <td>
                  {lab.orderedTests.map((t, index) => {
                    const test = t.test.service_name + ",";

                    return test;
                  })}
                </td>

                {/* <td>{lab.requestBy.username}</td> */}
                <td>{lab.status ? "active" : "inactive"}</td>
                {/* <td>acti</td> */}
              </tr>
            ))}

          <tr></tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default LabRequestedList;
