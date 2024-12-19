import React from "react";
import { Table } from "react-bootstrap";
import { useGetDashboardPatientVisit } from "../../hooks/useGetDashboardPatientVisit";
import { format } from "date-fns";
import { parse } from "date-fns";
import { FaRegBell } from "react-icons/fa6";

const DashboardUpcomigVisitTable = () => {
  const { data } = useGetDashboardPatientVisit();
  return (
    <div className="p-3  bg-hrun-box hrunboxshadow">
      <h5 className="p-2 mb-0">Upcoming Patient Visit</h5>
      <hr className="mt-0" />
      <Table responsive striped>
        <thead>
          <tr>
            {/* <td>#</td> */}
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((visit, index) => (
            <tr key={visit.id}>
              <td>
                {visit.patient.firstName} {visit.patient.middleName}
              </td>
              <td>
                {visit.doctor.employee.firstName}{" "}
                {visit.doctor.employee.middleName}
              </td>
              <td>{visit.assignment_date}</td>
              <td>
                {format(
                  parse(visit.visit_time, "HH:mm:ss", new Date()),
                  "h:mm a"
                )}
              </td>
              <td>
                {" "}
                <span
                  style={{
                    borderRadius: 15,
                    padding: "0.2rem 0.5rem",
                    fontSize: 13,

                    backgroundColor: "#ffc107",
                  }}
                  className=" text-white text-center d-inline-flex align-items-center justify-content-center"
                >
                  {visit.stage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DashboardUpcomigVisitTable;
