import React from "react";
import { useLocation } from "react-router-dom";
import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { Table } from "react-bootstrap";
import { format } from "date-fns";

const LabResultTab = () => {
  const { state } = useLocation();
  const {
    data: investigations,
    isRefetching,
    refetch,
  } = useOrdered_Lab_Investigations(state.id);
  return (
    <div>
      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th className="text-nowrap">Test Name</th>
            <th>RequestedBy</th>
            <th className="text-nowrap">Requested Time</th>
            <th>Result</th>
            <th className="text-nowrap">ReportedBy</th>
            <th className="text-nowrap">Report Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {investigations?.orderedTest
            ?.filter((i) => !i.test.labTestProfile.isPanel)
            .map((investigation, index) => (
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
                  {/* // {investigation.reportedBy?.employee?.firstName} //{" "}
                  {investigation.reportedBy?.employee?.middleName}{" "} */}
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
                {/* <td>{investigation.status}</td> */}
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

export default LabResultTab;
