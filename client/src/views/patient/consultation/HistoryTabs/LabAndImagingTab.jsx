import React from "react";
import { useGetPatientLabs } from "../../hooks/consultationHooks/PatientOverViewHooks/useGetPatientLabs";
import { Table } from "react-bootstrap";
import { format } from "date-fns";

const LabAndImagingTab = ({ patientId }) => {
  const { data: labs } = useGetPatientLabs({ patientId });
  console.log(labs);
  // const {data} =
  return (
    <div>
      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Test Name</th>
            <th>Requested By</th>
            <th>Requested Time</th>
            <th>Result</th>
            <th>Reported By</th>
            <th>Report Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {labs
            ?.filter((i) => !i.test.labTestProfile.isPanel)
            ?.map((investigation, index) => (
              <tr key={investigation.id}>
                <td>{index + 1}</td>
                <td>{investigation.test?.service_name}</td>
                <td>
                  {investigation.requestedBy?.employee?.firstName}{" "}
                  {investigation.requestedBy?.employee?.middleName}
                </td>
                <td>
                  {format(new Date(investigation.order_time), "yyyy-MM-dd") +
                    "    " +
                    format(new Date(investigation.order_time), "hh:mm a")}
                </td>
                <td>
                  {investigation?.result ? (
                    investigation.result
                  ) : (
                    <span className="text-danger">__</span>
                  )}
                </td>
                <td>
                  {investigation.reportedBy ? (
                    investigation.reportedBy?.employee?.firstName +
                    " " +
                    investigation.reportedBy?.employee?.middleName
                  ) : (
                    <span className="text-danger">__</span>
                  )}
                </td>
                <td>
                  {investigation.report_time ? (
                    format(new Date(investigation.report_time), "yyyy-MM-dd") +
                    "    " +
                    format(new Date(investigation.report_time), "hh:mm a")
                  ) : (
                    <span className="text-danger">__</span>
                  )}
                </td>

                <td>
                  <span
                    style={{
                      borderRadius: 15,
                      padding: "0.2rem 0.5rem",
                      fontSize: 13,
                      fontWeight: 500,
                      backgroundColor:
                        investigation.status === "completed"
                          ? "green"
                          : "#ffc107",
                      color:
                        investigation.status === "completed"
                          ? "white"
                          : "white",
                    }}
                    className="d-inline-flex align-items-center justify-content-center"
                  >
                    {investigation.status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LabAndImagingTab;
