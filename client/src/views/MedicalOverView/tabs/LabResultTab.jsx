import React from "react";
import useOrdered_Lab_Investigations from "../../patient/History/investigation/hooks/useOrdered_Lab_Investigations";
import { useLocation } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import { format } from "date-fns";
import { IoReloadOutline } from "react-icons/io5";

const LabResultTab = () => {
  const { state } = useLocation();
  const {
    data: investigations,
    isRefetching,
    refetch,
  } = useOrdered_Lab_Investigations(state.id);
  //   console.log(investigations);
  return (
    <div>
      <div className="d-flex justify-content-end gap-2 align-items-center w-100 mb-2  mt-2">
        <button
          disabled={isRefetching}
          onClick={refetch}
          type="button"
          className="btn btn-success btn-sm d-flex align-items-center gap-2 me-3 "
        >
          {/* <IoReloadOutline /> */}
          {isRefetching ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <IoReloadOutline />
          )}
          Reload
        </button>
      </div>
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
          {investigations?.orderedTest
            ?.filter((i) => i.is_underpanel)
            .map((investigation, index) => (
              <tr key={investigation.id}>
                <td>{index + 1}</td>
                <td>{investigation.test?.service_name}</td>
                <td>
                  {investigation.requestedBy?.employee?.firstName}
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
