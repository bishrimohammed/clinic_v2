import React from "react";
import { useGetMedicalOverview } from "./hooks/useGetMedicalOverview";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OverviewList = () => {
  const { data } = useGetMedicalOverview();
  console.log(data);
  const navigate = useNavigate();
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Patient Id</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((medicalrecord, index) => (
            <tr
              style={{ cursor: "pointer" }}
              key={medicalrecord.id}
              onClick={() => {
                navigate("view-detail", { state: medicalrecord });
              }}
            >
              <td>{index + 1}</td>
              <td>
                {medicalrecord.patient.firstName}{" "}
                {medicalrecord.patient.middleName}{" "}
                {medicalrecord.patient.lastName}
              </td>
              <td>{medicalrecord.patient.card_number}</td>
              <td>{medicalrecord.patient.phone}</td>
              <td>{medicalrecord.patient.gender}</td>
              <td>{medicalrecord.status ? "Active" : "inactive"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OverviewList;
