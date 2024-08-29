import React from "react";
import { Table } from "react-bootstrap";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import SmartPaginationComponent from "../../components/SmartPaginationComponent";

const ActiveMedicalRecordTable = ({ data }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const handlePagination = (page) => {
    setSearchParams((prev) => {
      prev.set("page", parseInt(page));

      return prev;
    });
  };
  const getSortBy = () => {
    return searchParams.get("sortBy");
  };
  const getSortDirection = () => {
    return searchParams.get("order");
  };
  const handleSort = (sortby) => {
    setSearchParams((prev) => {
      if (searchParams.get("sortBy") !== sortby) {
        prev.set("order", "asc");
        prev.set("sortBy", sortby);
        //  return {...prev, sortBy: sortby, order: searchParams.get("order") === "asc"? "desc" : "asc" }
      } else {
        prev.set("order", searchParams.get("order") === "asc" ? "desc" : "asc");
      }
      return prev;
    });
  };
  return (
    <>
      {" "}
      <Table striped responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSort("patient_name");
              }}
            >
              Patient Name{" "}
              {getSortBy() == "patient_name" ? (
                getSortDirection() === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSort("patientId");
              }}
            >
              Patient Id{" "}
              {getSortBy() == "patientId" ? (
                getSortDirection() === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null}
            </th>
            <th>Phone</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSort("visit_date");
              }}
            >
              Visit Date{" "}
              {getSortBy() == "visit_date" ? (
                getSortDirection() === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null}
            </th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.visits?.map((medicalrecord, index) => (
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
              <td>{medicalrecord.visit.assignment_date}</td>
              <td>{medicalrecord.patient.gender}</td>

              <td>
                <span
                  style={{
                    borderRadius: 15,
                    padding: "0.2rem 0.5rem",
                    fontSize: 14,
                  }}
                  className=" text-white bg-success   d-inline-flex align-items-center justify-content-center"
                >
                  {medicalrecord.status ? "Active" : "inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SmartPaginationComponent
        currentPage={parseInt(data?.currentPage) || 1}
        totalPages={parseInt(data?.totalPages)}
        onPageChange={handlePagination}
      />
    </>
  );
};

export default ActiveMedicalRecordTable;
