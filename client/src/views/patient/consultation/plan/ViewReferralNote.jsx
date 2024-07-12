import React from "react";
import { Image, Modal } from "react-bootstrap";
import PrintHeader from "../../History/print/printComponents/PrintHeader";
import { differenceInYears } from "date-fns";
import { getClinicInformation } from "../../../../utils/getClinicInformation";
import { Host_URL } from "../../../../utils/getHost_URL";
import { useLocation } from "react-router-dom";
import { useGetDiagnosis } from "../../hooks/consultationHooks/useGetDiagnosis";
import { useGet_Internal_MedicalRecordPrescription } from "../../hooks/consultationHooks/medication/useGet_Internal_MedicalRecordPrescription";

const ViewReferralNote = ({ show, handleClose, referralNote }) => {
  //   console.log(referralNote);
  //   return;
  const { state } = useLocation();
  //   const { data: patient } = useGetPatient(state.patient_id);
  const { data: diagnosis } = useGetDiagnosis(state.medicalRecord_id);
  const { data: prescriptions } = useGet_Internal_MedicalRecordPrescription(
    state.medicalRecord_id
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="py-1 px-3" closeButton>
        <Modal.Title>
          {" "}
          <span style={{ fontSize: 16 }}>View Referral Note</span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>
        This is a preview of the sick leave note. You can edit and finalize it
        before submitting.
      </p> */}
        <div className="">
          <div className="mb-2">
            <PrintHeader document_title="Referral Note" />
            {/* <hr className="opacity-100 border-2 mt-4 border-dark" /> */}
          </div>
          {/* <div className="mb-2 d-flex align-items-center justify-content-center">
          <h4 className="border-bottom border-2 border-dark">
            Medical Certificate
          </h4>
        </div> */}

          <div className="d-flex justify-content-end">
            <div>
              <p className="mb-1">
                {" "}
                <span className="fw-bold">Ref. No.</span>{" "}
                {referralNote?.patient?.card_number}
              </p>
              <p className="mb-1">
                <span className="fw-bold">Date</span>: 26/01/2024
              </p>
            </div>
          </div>
          <p className="py-1">
            To <span className="fw-bold">{referralNote?.referral_to} </span>{" "}
            Hospital <span className="fw-bold">{referralNote?.department}</span>{" "}
            Department
          </p>
          <p className="mb-1">
            <span className="fw-bold">Patient's Name:</span>{" "}
            {referralNote?.patient?.firstName}{" "}
            {referralNote?.patient?.middleName}{" "}
            {referralNote?.patient?.lastName}
          </p>
          <div className="d-flex gap-5 mb-1">
            <p className="mb-1">
              {" "}
              <span className="fw-bold">Age:</span>{" "}
              {differenceInYears(new Date(), referralNote?.patient?.birth_date)}{" "}
              years old
            </p>
            <p className="mb-1">
              {" "}
              <span className="fw-bold">Sex: </span>
              {referralNote?.patient?.gender}
            </p>
          </div>
          {/* <p>
            {" "}
            <span className="fw-bold">Date of Examination: </span>7/2/2024
          </p> */}
          {/* <p style={{ fontSize: 14 }}>
            This is to certify that{" "}
            <span className="fw-bold">
              {patient?.firstName} {patient?.middleName} {patient?.lastName}{" "}
            </span>{" "}
            was seen by <span className="fw-bold">Dr Ali Man</span> on{" "}
            <span className="fw-bold">07-02-2024</span>.{" "}
          </p> */}
          {/* 
          <h6>Diagnosis</h6>
          {diagnosis?.map((dia) => (
            <p style={{ fontSize: 14 }} className="mb-1" key={dia.id}>
              {dia.diagnosis} {"("} {dia.status} {")"}
            </p>
          ))} */}
          <div className="d-flex gap-2 mb-2">
            <h6 className="text-nowrap">Clinical Finding:</h6>
            <p>{referralNote?.clinical_finding}</p>
          </div>
          <div className="d-flex gap-2 mb-2">
            <h6 className="text-nowrap">Diagnosis:</h6>
            <div className=" d-flex gap-2 flex-wrap">
              {diagnosis?.map((dia, index) => (
                <p style={{ fontSize: 14 }} className="mb-0" key={dia.id}>
                  {dia.diagnosis}
                  {"("}
                  {dia.status}
                  {")"}
                  {index < diagnosis.length - 1 && ","}
                </p>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2">
            <h6 className="text-nowrap">Rx given:</h6>
            <div className=" d-flex gap-2 flex-wrap">
              {prescriptions?.map((p, index) => (
                <p style={{ fontSize: 14 }} className="mb-0" key={p.id}>
                  {p?.medicine?.service_name}
                  {/* {"("} {p.status} {")"} */}
                  {index < prescriptions.length - 1 && ","}
                </p>
              ))}
            </div>
          </div>
          <div className="d-flex gap-2 my-2">
            <h6 className="text-nowrap">Reasons for Referral:</h6>
            <p>{referralNote?.reason_for_referral}</p>
          </div>
          <p style={{ fontSize: 14 }} className="mt-2">
            {/* {" "}
            {patient?.gender === "Male" ? "He" : "She"} has been unfit for
            work/school from <span className="fw-bold">{start_date}</span> up to
            and including <span className="fw-bold">{end_date}</span>{" "} */}
          </p>
        </div>
        {/* <div className=" mt-2">
          <p>
            <span className="fw-bold">Phyasican Name:</span> Dr Tola
          </p>
          <p className="">
            <span className="fw-bold align-self-start">Signature:</span>{" "}
            <img
              src={
                Host_URL +
                "uploads/photo_2024-07-02_09-11-55-removebg-preview.png"
              }
              // height={100}
              width={150}
              style={{ objectFit: "contain", objectPosition: "center" }}
              alt=""
            />
          </p>
        </div> */}
        <div className="d-flex mt-2">
          <div>
            <p>
              <span className="fw-bold">Phyasican Name:</span>{" "}
              {referralNote?.doctor?.employee?.doctor_titer ? (
                <Image
                  src={Host_URL + referralNote?.doctor?.employee?.doctor_titer}
                  fluid
                  width={110}
                />
              ) : (
                "Dr " +
                referralNote?.doctor?.employee?.firstName +
                referralNote?.doctor?.employee?.middleName
              )}
            </p>
            <p className="">
              <span className="fw-bold align-self-start">Signature:</span>{" "}
              <img
                src={
                  Host_URL + referralNote?.doctor?.employee?.digital_signature
                }
                // height={100}
                width={150}
                style={{ objectFit: "contain", objectPosition: "center" }}
                alt=""
              />
            </p>
          </div>
          <div>
            <Image src={Host_URL + getClinicInformation()?.clinic_seal} />
            {/* {getClinicInformation().clinicSeal} */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewReferralNote;
