import React from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useGetPatient } from "./hooks/patientHooks/useGetPatient";

const ViewPatientModal = ({ show, handleClose, patient }) => {
  const { data, error, isPending } = useGetPatient(patient.id);
  // console.log(error);
  // console.log(patient);
  // console.log(data);
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Patient Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="border-bottom border-dark border-1  fw-bolder pt-1 pb-2 ps-2 mx-3 mb-3 ">
          Patient Information
        </h6>{" "}
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Name</p>
            <p className="small">
              {patient.firstName} {patient.middleName} {patient.lastName}
            </p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Patient Id</p>
            <p className="small">{data?.card_number}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Phone</p>
            <p className="small">
              {data?.has_phone ? data?.phone : data?.address?.phone_1}
            </p>
          </Col>

          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Email</p>
            <p className="small">
              {data?.address?.email ? (
                data?.address?.email
              ) : (
                <span className="text-danger w-100 fw-bold">___</span>
              )}
            </p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Gender</p>
            <p className="small">{patient.gender}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Birth Date</p>
            <p className="small">{patient.birth_date}</p>
          </Col>
          {isPending ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" />
            </div>
          ) : (
            <>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">is New Patient </p>
                <p className="small">{data?.is_new ? "Yes" : "No"}</p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Manual card Number</p>
                <p className="small">
                  {data?.manual_card_id ? (
                    data?.manual_card_id
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">is Credit Patient</p>
                <p className="small">{data?.is_credit ? "Yes" : "No"}</p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Company Name</p>
                <p className="small">
                  {" "}
                  {data?.creditCompany ? (
                    data?.creditCompany.name
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Marital Status</p>
                <p className="small">
                  {data?.marital_status ? (
                    data?.marital_status
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Occupation</p>
                <p className="small">
                  {data?.occupation ? (
                    data?.occupation
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Guardian name</p>
                <p className="small">
                  {data?.guardian_name ? (
                    data?.guardian_name
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <h6 className="border-bottom border-dark border-1 fw-bolder pt-1 pb-2 ps-2 ms-3 mb-3 ">
                Patient Home Address Information
              </h6>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Region</p>
                <p className="small">
                  {data?.address?.woreda?.SubCity?.city?.region?.name}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">City</p>
                <p className="small ">
                  {data?.address?.woreda?.SubCity?.city?.name}
                </p>
              </Col>

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Subcity</p>
                <p className="small">
                  {data?.address?.woreda?.SubCity?.subCity_name}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Woreda</p>
                <p className="small ">{data?.address?.woreda?.name}</p>
              </Col>

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">House Number</p>
                <p className="small mb-0">
                  {data?.address?.house_number ? (
                    data?.address?.house_number
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                {/* <p className="mb-0 text-muted fw-bold">House Number</p>
              <p className="small mb-0">
                {data?.address?.house_number ? (
                  employee.address?.house_number
                ) : (
                  <span className="text-danger w-100 fw-bold">___</span>
                )}
              </p> */}
              </Col>

              <h6 className="border-bottom pt-1 pb-2 ps-2 mx-3 mb-3 ">
                Emergency Contact Information
              </h6>

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Name</p>
                <p className="small">{data?.emergencyContact?.firstName}</p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Father Name</p>
                <p className="small">{data?.emergencyContact?.middleName}</p>
              </Col>

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Grandfather Name</p>
                <p className="small">
                  {data?.emergencyContact?.lastName ? (
                    data?.emergencyContact?.lastName
                  ) : (
                    <span className="text-danger w-100 fw-bold">___</span>
                  )}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Relationship</p>
                <p className="small">{data?.emergencyContact?.relationship}</p>
              </Col>

              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">
                  Same Address as Patient
                </p>
                <p className="small">
                  {data?.address_id === data?.emergencyContact.address.id
                    ? "Yes"
                    : "No"}
                </p>
              </Col>
              <Col sm={6} className="px-4">
                <p className="mb-0 text-muted fw-bold">Phone</p>
                <p className="small">{data?.emergencyContact.phone}</p>
              </Col>

              {data?.address_id !== data?.emergencyContact.address.id && (
                <>
                  <Col sm={6} className="px-4">
                    <p className="mb-0 text-muted fw-bold">Region</p>
                    <p className="small">
                      {
                        data?.emergencyContact.address?.woreda?.SubCity?.city
                          ?.region?.name
                      }
                    </p>
                  </Col>
                  <Col sm={6} className="px-4">
                    <p className="mb-0 text-muted fw-bold">City</p>
                    <p className="small ">
                      {
                        data?.emergencyContact.address?.woreda?.SubCity?.city
                          ?.name
                      }
                    </p>
                  </Col>

                  <Col sm={6} className="px-4">
                    <p className="mb-0 text-muted fw-bold">Subcity</p>
                    <p className="small">
                      {
                        data?.emergencyContact.address?.woreda?.SubCity
                          ?.subCity_name
                      }
                    </p>
                  </Col>
                  <Col sm={6} className="px-4">
                    <p className="mb-0 text-muted fw-bold">Woreda</p>
                    <p className="small ">
                      {data?.emergencyContact.address?.woreda?.name}
                    </p>
                  </Col>
                  <Col sm={6} className="px-4">
                    <p className="mb-0 text-muted fw-bold">House Nember</p>
                    <p className="small mb-0">
                      {data?.emergencyContact.address?.house_number ? (
                        data?.emergencyContact.address.house_number
                      ) : (
                        <span className="text-danger w-100 fw-bold">___</span>
                      )}
                    </p>
                  </Col>
                </>
              )}
            </>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPatientModal;
