import React, { useMemo } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import PrintHeader from "../../History/print/printComponents/PrintHeader";
import { useGetPatient } from "../../hooks/patientHooks/useGetPatient";
import { useLocation } from "react-router-dom";
import { differenceInYears } from "date-fns";
import { Host_URL } from "../../../../utils/getHost_URL";
import { useGetCurrentUser } from "../../../../hooks/useGetCurrentUser";
import { getClinicInformation } from "../../../../utils/getClinicInformation";

const PreviewSickLeaveNote = ({
  show,
  handleClose,
  diagnosisIds,
  end_date,
  start_date,
  diagnosis,
}) => {
  //   console.log(diagnosis);
  //   console.log(diagnosisIds);
  const user = useGetCurrentUser();
  // console.log(diagnosisIds);
  const { state } = useLocation();
  const { data: patient } = useGetPatient(state.patient_id);
  //   console.log(patient);
  //   map((dia) => diagnosis?.find((diag) => diag.id === parseInt(dia.diagnosis_id)))

  const getDiagnosis = (id) => {
    const diag = diagnosis?.find((diag) => diag.id === parseInt(id));
    console.log(diag);
    return diag ? diag?.diagnosis + "(" + diag.status + ")" : null;
  };
  return (
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header className="py-1 px-3" closeButton>
        <Modal.Title>
          {" "}
          <span style={{ fontSize: 16 }}>Preview Sick Leave Note</span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>
          This is a preview of the sick leave note. You can edit and finalize it
          before submitting.
        </p> */}
        <div className="">
          <div className="mb-2">
            <PrintHeader document_title="Sick Leave" />
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
                <span className="fw-bold">Date</span>: 26/01/2024
              </p>
              <p className="mb-1">
                {" "}
                <span className="fw-bold">Card No.</span> {patient?.card_number}
              </p>
            </div>
          </div>
          <p className="mb-1">
            <span className="fw-bold">Patient's Name:</span>{" "}
            {patient?.firstName} {patient?.middleName} {patient?.lastName}
          </p>
          <div className="d-flex gap-5">
            <p className="mb-1">
              {" "}
              <span className="fw-bold">Age:</span>{" "}
              {differenceInYears(new Date(), patient?.birth_date)} years old
            </p>
            <p className="mb-1">
              {" "}
              <span className="fw-bold">Sex: </span>
              {patient?.gender}
            </p>
          </div>
          <p>
            {" "}
            <span className="fw-bold">Date of Examination: </span>7/2/2024
          </p>
          <p style={{ fontSize: 14 }}>
            This is to certify that{" "}
            <span className="fw-bold">
              {patient?.firstName} {patient?.middleName} {patient?.lastName}{" "}
            </span>{" "}
            was seen by <span className="fw-bold">Dr {user.name}</span> on{" "}
            <span className="fw-bold">07-02-2024</span>.{" "}
          </p>

          <h6>Diagnosis</h6>
          {diagnosisIds
            ?.filter((d) => d.value)
            .map((dia) => (
              <p
                style={{ fontSize: 14 }}
                className="mb-1"
                key={dia.diagnosis_id}
              >
                {getDiagnosis(dia.diagnosis_id)}
              </p>
            ))}
          <p style={{ fontSize: 14 }} className="mt-2">
            {" "}
            {patient?.gender === "Male" ? "He" : "She"} has been unfit for
            work/school from <span className="fw-bold">{start_date}</span> up to
            and including <span className="fw-bold">{end_date}</span>{" "}
          </p>
        </div>
        <div className="d-flex mt-2">
          <div>
            <p>
              <span className="fw-bold">Phyasican Name:</span>{" "}
              {user.doctor_titer ? (
                <Image src={Host_URL + user?.doctor_titer} fluid width={110} />
              ) : (
                "Dr " + user.name
              )}
            </p>
            <p className="">
              <span className="fw-bold align-self-start">Signature:</span>{" "}
              <img
                src={Host_URL + user.digital_signature}
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
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default PreviewSickLeaveNote;
