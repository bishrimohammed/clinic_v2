import React from "react";
import { Image, Modal, Table } from "react-bootstrap";
import PrintWrapper from "../../../components/PrintWrapper";
import PrintHeader from "../../patient/History/print/printComponents/PrintHeader";
import PatientInfornPrint from "../../patient/History/print/printComponents/PatientInfornPrint";
import { format } from "date-fns";
import { Host_URL } from "../../../utils/getHost_URL";
import { getClinicInformation } from "../../../utils/getClinicInformation";

const LabPrintPreviewModal = ({ show, handleClose, patient, labTests }) => {
  // console.log(labTests);
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lab Report Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <PrintWrapper documentTitle="Lab result090">
          <div className="p-2">
            <div className="p-2">
              <PrintHeader document_title="Lab Result" />
              <hr className="opacity-100 border-2 mt-4 border-dark" />
              <div className="report-info d-flex px-2 justify-content-between">
                <div>
                  {/* <h6>Demography Information</h6> */}

                  <PatientInfornPrint patient={patient} />
                </div>
                <div>
                  {/* <h6>Routing Information</h6> */}
                  <div className="ps-2 mb-1">
                    <span className="fw-bold me-1">Order Time:</span>{" "}
                    {/* {format(props?.labResult?.orderTime)}
                  {formatHour(props?.labResult?.orderTime)} */}
                  </div>
                  <div className="ps-2 mb-1">
                    <span className="fw-bold me-1">Report Time:</span>{" "}
                    {/* {format(props?.labResult?.reportTime)}{" "}
                  {formatHour(props?.labResult?.reportTime)} */}
                  </div>
                  <div className="ps-2 mb-1">
                    <span className="fw-bold me-1">Request By: </span>
                    {/* {props?.labResult?.requestBy?.username} */}
                  </div>
                  <div className="ps-2 mb-1">
                    <span className="fw-bold me-1">Reported By:</span>{" "}
                    {/* {props?.labResult?.reportedBy?.username} */}
                  </div>
                </div>
              </div>

              <div className="test-results mt-4">
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
                    {labTests
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
                            {format(
                              new Date(investigation.order_time),
                              "yyyy-MM-dd"
                            ) +
                              "    " +
                              format(
                                new Date(investigation.order_time),
                                "hh:mm a"
                              )}
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
                              format(
                                new Date(investigation.report_time),
                                "yyyy-MM-dd"
                              ) +
                              "    " +
                              format(
                                new Date(investigation.report_time),
                                "hh:mm a"
                              )
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
              <div
                // style={{ position: "absolute", bottom: "0", right: "20px" }}
                className="d-flex justify-content-end"
              >
                <Image src={Host_URL + getClinicInformation()?.clinic_seal} />
              </div>
            </div>
          </div>
        </PrintWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default LabPrintPreviewModal;
