import React, { Fragment, useMemo } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useGetClinicInformation } from "../../../Administration/clinic setting/hooks/useGetClinicInformation";
import { MdEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useGetPatient } from "../../hooks/patientHooks/useGetPatient";
import { useGet_Internal_MedicalRecordPrescription } from "../../hooks/consultationHooks/medication/useGet_Internal_MedicalRecordPrescription";
import { useGet_External_MedicalRecordPrescription } from "../../hooks/consultationHooks/medication/useGet_External_MedicalRecordPrescription";
import { useGetCurrentUser } from "../../../../hooks/useGetCurrentUser";
import { Host_URL } from "../../../../utils/getHost_URL";

const AddReferralNoteModal = ({
  show,
  handleClose,
  fieldsLength,
  diagnosis,
  register,
  errors,
  getValues,
  remove,
  watch,
}) => {
  //   console.log(errors);
  const { data: clinicData } = useGetClinicInformation();
  const { state } = useLocation();
  const { data: patient } = useGetPatient(state.patient_id);
  const { data: internalPrescriptions } =
    useGet_Internal_MedicalRecordPrescription(state.medicalRecord_id);
  const { data: externalPrescriptions } =
    useGet_External_MedicalRecordPrescription(state.medicalRecord_id);
  const prescriptions = useMemo(
    () => internalPrescriptions?.concat(externalPrescriptions),
    [internalPrescriptions, externalPrescriptions]
  );
  const user = useGetCurrentUser();
  return (
    <Modal
      size="md"
      show={show}
      onHide={() => {
        if (
          errors.referral_notes?.[fieldsLength - 1]?.hospital_name ||
          getValues(`referral_notes[${fieldsLength - 1}].hospital_name`) ===
            "" ||
          getValues(`referral_notes[${fieldsLength - 1}].clinical_finding`) ===
            "" ||
          errors.referral_notes?.[fieldsLength - 1]?.clinical_finding
        ) {
          console.log(
            getValues(`referral_notes[${fieldsLength - 1}].hospital_name`)
          );
          remove(fieldsLength - 1);
        }
        handleClose(false);
      }}
      //   backdrop="static"
    >
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Add Referral Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ color: clinicData?.brand_color }}>
          <div style={{ width: "70%" }} className="d-flex flex-column">
            <div>
              <h5
                style={{ textTransform: "uppercase" }}
                className="text-center"
              >
                {clinicData?.name}
              </h5>
            </div>
            <div
              style={{ fontSize: 13 }}
              className="d-flex justify-content-between align-items-center text-sm"
            >
              <span>
                <MdOutlinePhoneInTalk /> {clinicData?.address?.phone_1}
              </span>
              <span>
                <MdEmail /> {clinicData?.address?.email}
              </span>
              <span>
                {/* <img src={internetIcon} width={13} color="red" alt="" /> */}
                <TbWorldWww className="me-1" />
                {clinicData?.website_url}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            {/* <div className="flex-grow-1">ksdjbjh</div> */}
            <div className="d-flex flex-column ">
              {" "}
              <div className="d-flex align-items-center  gap-2">
                <span className="">Ref. No : </span>
                <input
                  type="text"
                  style={{
                    border: "none",
                    borderBottom: `1px solid ${clinicData?.brand_color}`,
                    outline: "none",
                  }}
                  className=" "
                />
              </div>
              <div className="d-flex align-items-center mt-2 gap-2">
                <span className="">Card No.</span>
                <p
                  style={{
                    border: "none",
                    borderBottom: `1px solid ${clinicData?.brand_color}`,
                    // outline: "none",
                  }}
                  className="mb-0 text-dark flex-grow-1"
                >
                  {patient?.card_number}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            {" "}
            <h5
              style={{
                border: "none",
                borderBottom: `2px solid ${clinicData?.brand_color}`,
                textTransform: "uppercase",
                // outline: "none",
              }}
              // className="border-bottom"
            >
              Patient Referral slip
            </h5>
          </div>
          <div className="d-flex align-items-center gap-1 mt-1">
            <span className="me-1">To</span>
            <input
              type="text"
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              {...register(
                `referral_notes.[${fieldsLength - 1}].hospital_name`
              )}
              // placeholder="Start Date"

              className="mb-0 text-dark flex-grow-1 px-2"
            />
            Hospital
          </div>
          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1">Patient's Name</span>
            <p
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              className="mb-0 text-dark flex-grow-1 px-1"
            >
              {patient?.firstName +
                " " +
                patient?.middleName +
                " " +
                patient?.lastName}
            </p>
          </div>
          <div className="d-flex gap-1 mt-3">
            <div className="d-flex align-items-center  mt-1">
              <span className="me-1">Age</span>
              <p
                style={{
                  border: "none",
                  borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }}
                className="mb-0 text-dark flex-grow-1 px-1"
              >
                {patient?.birth_date}
              </p>
            </div>
            <div className="d-flex align-items-center  mt-1">
              <span className="me-1">Sex</span>
              <p
                style={{
                  border: "none",
                  borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }}
                className="mb-0 text-dark flex-grow-1 px-1"
              >
                {patient?.gender}
              </p>
            </div>
            <div className="d-flex align-items-center  mt-1">
              <span className="me-1">Occupation</span>
              <p
                style={{
                  border: "none",
                  borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }}
                className="mb-0 text-dark flex-grow-1 px-1"
              >
                {patient?.occupation}
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1">Clinical Finding</span>
            <textarea
              type="textarea"
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                outline: "none",
              }}
              {...register(
                `referral_notes.[${fieldsLength - 1}].clinical_finding`
              )}
              className="mb-0 text-dark flex-grow-1 px-2"
            />
          </div>
          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1 text-nowrap">Diagnosis</span>
            <p
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              className="mb-0 text-dark flex-grow-1 px-2"
            >
              {diagnosis?.map((d, index) => (
                <span key={d.id}>
                  {d.diagnosis}
                  {index + 1 !== prescriptions?.length ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1 text-nowrap">Rx Given</span>
            <p
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              className="mb-0 text-dark flex-grow-1 px-2"
            >
              {prescriptions?.map((prescription, index) => (
                <span key={prescription.id}>
                  {prescription.is_internal
                    ? prescription.medicine.service_name
                    : prescription.drug_name}
                  {index + 1 !== prescriptions?.length ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1">Reasons for Referral</span>
            <input
              type="text"
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              {...register(`referral_notes.[${fieldsLength - 1}].reason`)}
              className="mb-0 text-dark flex-grow-1 px-2"
            />
          </div>

          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1 text-nowrap">Physicain Name</span>
            <p
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              className="mb-0 text-dark  px-2"
            >
              {user.doctor_titer ? (
                <img width={100} src={Host_URL + user.doctor_titer} />
              ) : (
                user.name
              )}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 mt-3">
            <span className="me-1 text-nowrap">Signature</span>
            <p
              style={
                {
                  // border: "none",
                  // borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }
              }
              className="mb-0 text-dark  px-2"
            >
              {<img width={100} src={Host_URL + user.digital_signature} />}
            </p>
          </div>
        </div>
        {/* <Row className="">
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Refer To</Form.Label>
              <Form.Control
                // type="date"
                type="text"
                {...register(
                  `referral_notes.[${fieldsLength - 1}].hospital_name`
                )}
                // placeholder="Start Date"
                isInvalid={
                  errors.referral_notes?.[fieldsLength - 1]?.hospital_name
                }
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors.referral_notes?.[fieldsLength - 1].hospital_name
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                // type="date"
                type="text"
                {...register(
                  `referral_notes.[${fieldsLength - 1}].department_name`
                )}
                // placeholder="Start Date"
                isInvalid={
                  errors.referral_notes?.[fieldsLength - 1]?.department_name
                }
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors.referral_notes?.[fieldsLength - 1]?.department_name
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group>
              <Form.Label>Clinical Finding</Form.Label>
              <Form.Control
                // type="date"
                as="textarea"
                {...register(
                  `referral_notes.[${fieldsLength - 1}].clinical_finding`
                )}
                // placeholder="Start Date"
                isInvalid={
                  errors.referral_notes?.[fieldsLength - 1]?.clinical_finding
                }
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors?.referral_notes?.[fieldsLength - 1]?.clinical_finding
                    ?.message
                }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                // type="date"
                type="text"
                {...register(`referral_notes.[${fieldsLength - 1}].reason`)}
                // placeholder="Start Date"
                isInvalid={errors.referral_notes?.[fieldsLength - 1]?.reason}
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.referral_notes?.[fieldsLength - 1]?.reason?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Ok
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default AddReferralNoteModal;
