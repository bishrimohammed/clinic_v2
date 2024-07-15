import React from "react";
import { Modal, Table } from "react-bootstrap";
import PrintWrapper from "../../../components/PrintWrapper";
import PrintHeader from "../../patient/History/print/printComponents/PrintHeader";
import PatientInfornPrint from "../../patient/History/print/printComponents/PatientInfornPrint";

const PrescriptionPrintPreviewModal = ({
  show,
  handleClose,
  patient,
  prescriptions,
}) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lab Report Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <PrintWrapper documentTitle="Lab result090">
          <div className="p-2">
            <div className="p-2">
              <PrintHeader document_title="Prescription" />
              <hr className="opacity-100 border-2 mt-4 border-dark" />
              <div className="report-info d-flex px-2 justify-content-between">
                <div>
                  <h6>Demography Information</h6>

                  <PatientInfornPrint patient={patient} />
                </div>
                <div>
                  <h6>Routing Information</h6>
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
                    {prescriptions?.map((p, index) => {
                      return (
                        <tr key={p.id}>
                          <td>{index + 1}</td>
                          <td>{p.medicine?.service_name}</td>
                          <td>{p.dosage}</td>
                          <td>{p.frequency}</td>
                          <td>{p.duration} days</td>
                          <td>
                            {new Date(p.start_date)
                              .toISOString()
                              .substring(0, 10)}
                          </td>
                          <td>
                            {/* {
                    p.doctor?.id === currentUser.id ? "You" : p.doctor?.employee?.firstName + " " + p.doctor?.middleName 
                  } */}
                            {p.doctor?.employee?.firstName}{" "}
                            {p.doctor?.employee?.middleName}{" "}
                            {p.doctor?.employee?.lastName}{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              {/* <div
              style={{ position: "absolute", bottom: "0", right: "20px" }}
              className="d-flex justify-content-end"
            >
              <Image src={Host_URL + getClinicInformation()?.clinic_seal} />
            </div> */}
            </div>
          </div>
        </PrintWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default PrescriptionPrintPreviewModal;
