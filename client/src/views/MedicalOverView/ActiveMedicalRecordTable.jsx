import React from "react";
import { Spinner, Table } from "react-bootstrap";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import SmartPaginationComponent from "../../components/SmartPaginationComponent";
import {
  fetchActiveMedicalRecord,
  useGetMedicalOverview,
} from "./hooks/useGetMedicalOverview";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosHeaders } from "../../api/useAxiosHeaders";
import { useURLPagination } from "../../hooks/useURLPagination";

const ActiveMedicalRecordTable = () => {
  const navigate = useNavigate();
  const {
    page,
    limit,
    order,
    sortBy,
    changePage,
    changePageLimit,
    changePageSortBy,
  } = useURLPagination({
    page: 1,
    limit: 10,
    sortBy: "visit_date",
    order: "desc",
  });
  const { data, isPending, isPlaceholderData } = useGetMedicalOverview({
    page: parseInt(page),
    limit: parseInt(limit),
    sortBy,
    order,
  });
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      const query = {
        page: parseInt(page) + 1,
        limit: parseInt(limit),
        sortBy,
        order,
      };
      queryClient.prefetchQuery({
        queryKey: ["Medical Record Overviews", query],
        queryFn: () => fetchActiveMedicalRecord(query, AxiosHeaders().headers),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return (
    <>
      <Table striped responsive bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                // handleSort("patient_name");
                changePageSortBy("patient_name");
              }}
            >
              Patient Name{" "}
              {/* {getSortBy() == "patient_name" ? (
                getSortDirection() === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null} */}
              {sortBy == "patient_name" ? (
                order === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => {
                // handleSort("patientId");
                changePageSortBy("patientId");
              }}
            >
              Patient Id{" "}
              {/* {getSortBy() == "patientId" ? (
                getSortDirection() === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null} */}
              {sortBy == "patientId" ? (
                order === "asc" ? (
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
                // handleSort("visit_date");
                changePageSortBy("visit_date");
              }}
            >
              Visit Date{" "}
              {/* {getSortBy() == "visit_date" ? (
                getSortDirection() === "asc" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )
              ) : null} */}
              {sortBy == "visit_date" ? (
                order === "asc" ? (
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
          {isPending && (
            <tr>
              <td className=" align-items-center" colSpan="8">
                <span>
                  <Spinner animation="border" size="sm" />
                </span>
              </td>
            </tr>
          )}
          {data?.visits?.map((medicalrecord, index) => (
            <tr
              style={{ cursor: "pointer" }}
              key={medicalrecord.id}
              onClick={() => {
                navigate("view-detail", { state: medicalrecord });
              }}
            >
              {/* <td>{index + 1}</td> */}
              <td>{(page - 1) * limit + index + 1}</td>
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
        onPageChange={changePage}
        onPageLimitChange={changePageLimit}
      />
    </>
  );
};

export default ActiveMedicalRecordTable;
