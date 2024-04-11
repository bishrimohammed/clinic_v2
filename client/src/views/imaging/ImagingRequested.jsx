import React, { useState } from "react";
import useGetImagingStudies_Requested from "../patient/hooks/useGetImagingStudies_Requested";
import { Container, Form, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ImagingRequested = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data, isPending, error } = useGetImagingStudies_Requested();
  const navigate = useNavigate();
  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
  };
  if (isPending) return <Spinner animation="grow" />;
  if (!data || error) {
    return <div>Error {error.message}</div>;
  }
  // console.log(data);
  return (
    <Container>
      {/* <Form>
        <div className="d-flex gap-3 p-3">
          <Form.Group>
            <Form.Label>Start Date:</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date, "start")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date:</Form.Label>
            <br />
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date, "end")}
            />
          </Form.Group>
        </div>
      </Form> */}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date Requested</th>
            <th>Patient</th>

            <th>Requested By</th>

            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((inves, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/patients/history/${inves.medicalId._id}/addimagingresult`
                )
              }
            >
              <td>{inves.orderTime}</td>
              <td>{inves.medicalId.patientId.name}</td>

              <td>{inves.requestBy.username}</td>
              <td>{inves.status}</td>
              <td>acti</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ImagingRequested;
