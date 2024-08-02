import React, { useMemo } from "react";
import { useGetClinicInformation } from "../../../../Administration/clinic setting/hooks/useGetClinicInformation";
import { useLocation } from "react-router-dom";
import { useGetPatient } from "../../../hooks/patientHooks/useGetPatient";
import { useGet_Internal_MedicalRecordPrescription } from "../../../hooks/consultationHooks/medication/useGet_Internal_MedicalRecordPrescription";
import { useGet_External_MedicalRecordPrescription } from "../../../hooks/consultationHooks/medication/useGet_External_MedicalRecordPrescription";
import { useGetCurrentUser } from "../../../../../hooks/useGetCurrentUser";
import { Button, Modal } from "react-bootstrap";
import { Host_URL } from "../../../../../utils/getHost_URL";
import { MdEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";

const PreviewRefferalNote2 = ({
  show,
  handleClose,
  // sicknote,
  diagnosis,
  control,
  getValues,
  remove,
  fieldIndex,
  register,
  errors,
}) => {
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
      show={show}
      // style={{ width: 800 }}
      size="md"
      onHide={() => {
        // if (
        //   errors.sick_notes?.[fieldsLength - 1]?.end_date ||
        //   getValues(`sick_notes[${fieldsLength - 1}].end_date`) === ""
        // ) {
        //   //   console.log(`sick_notes[${fieldsLength - 1}].end_date`);
        //   remove(fieldsLength - 1);
        // }
        if (
          errors.sick_notes?.[fieldIndex]?.sickleave ||
          getValues(`sick_notes[${fieldIndex}].sickleave`) === ""
        ) {
          //   console.log(`sick_notes[${fieldsLength - 1}].end_date`);
          remove(fieldIndex);
        }
        handleClose(false);
      }}
      //   backdrop="static"
    >
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Preview Referral Note</Modal.Title>
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
              {...register(`referral_notes.[${fieldIndex}].hospital_name`)}
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
              {...register(`referral_notes.[${fieldIndex}].clinical_finding`)}
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
              {...register(`referral_notes.[${fieldIndex}].reason`)}
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
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            if (
              errors.sick_notes?.[fieldIndex]?.sickleave ||
              getValues(`sick_notes[${fieldIndex}].sickleave`) === ""
            ) {
              //   console.log(`sick_notes[${fieldIndex}].end_date`);
              remove(fieldIndex);
            }
            handleClose();
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewRefferalNote2;
