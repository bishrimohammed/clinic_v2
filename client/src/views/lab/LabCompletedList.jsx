// import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetLabCompleted } from "./hooks/useGetLabCompleted";

const LabCompletedList = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = useGetLabCompleted();

  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error... + {error.message}</div>;
  console.log(data);

  return (
    <Container>
      <h5 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
        Today completed lab investigation
      </h5>
      {data.length !== 0 ? (
        <Table striped bordered>
          <thead>
            <tr>
              {/* <th>Date Requested</th> */}
              <th>Patient</th>
              {/* <th>Requested By</th>
              <th>Reported By</th> */}
              <th>status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((lab, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/patients/history/${lab.medicalRecord.id}/viewlabresult`,
                    {
                      state: lab,
                    }
                  )
                }
              >
                {/* <td>{lab.orderTime}</td> */}
                <td>
                  {lab.medicalRecord.patient.firstName}{" "}
                  {lab.medicalRecord.patient.firstName}
                </td>
                {/* <td>{history.labrequest.requestBy.username}</td> */}

                {/* <td>{lab.requestBy.username}</td>
                  <td>{lab.reportedBy.username}</td> */}
                <td>{lab.status ? "pending" : "completed"}</td>
                {/* <td>acti</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="p-2 text-center bg-success bg-opacity-25 text-dark">
          There is no Lab Result for this history
        </div>
      )}
    </Container>
  );
};

export default LabCompletedList;
