import React from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { getClinicInformation } from "../../../../utils/getClinicInformation";
import { Host_URL } from "../../../../utils/getHost_URL";
import { differenceInYears } from "date-fns";
import PrintHeader from "../../History/print/printComponents/PrintHeader";

const ViewSickNote = ({ show, handleClose, sickNote }) => {
  console.log(sickNote);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="py-1 px-3" closeButton>
        <Modal.Title>
          {" "}
          <span style={{ fontSize: 16 }}>View Sick Leave Note</span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h5>Date: {format(new Date(sickNote.date), "yyyy-MM-dd")}</h5>
        <p>Reason: {sickNote.reason}</p>
        <p>Treatment: {sickNote.treatment}</p> */}
        <div className="">
          <div className="mb-2">
            <PrintHeader document_title="Sick Leave Note" />
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
                <span className="fw-bold">Card No.</span>{" "}
                {sickNote?.patient?.card_number}
              </p>
            </div>
          </div>
          <p className="mb-1">
            <span className="fw-bold">Patient's Name:</span>{" "}
            {sickNote?.patient?.firstName} {sickNote?.patient?.middleName}{" "}
            {sickNote?.patient?.lastName}
          </p>
          <div className="d-flex gap-5">
            <p className="mb-1">
              {" "}
              <span className="fw-bold">Age:</span>{" "}
              {differenceInYears(new Date(), sickNote?.patient?.birth_date)}{" "}
              years old
            </p>
            <p className="mb-1">
              {" "}
              <span className="fw-bold">Sex: </span>
              {sickNote?.patient?.gender}
            </p>
          </div>
          <p>
            {" "}
            <span className="fw-bold">Date of Examination: </span>{" "}
            {sickNote?.date_of_examination}
          </p>
          <p style={{ fontSize: 14 }}>
            This is to certify that{" "}
            <span className="fw-bold">
              {sickNote?.patient?.firstName} {sickNote?.patient?.middleName}{" "}
              {sickNote?.patient?.lastName}{" "}
            </span>{" "}
            was seen by{" "}
            <span className="fw-bold">
              Dr{" "}
              {sickNote?.doctor?.employee?.firstName +
                sickNote?.doctor?.employee?.middleName}
            </span>{" "}
            on <span className="fw-bold">07-02-2024</span>.{" "}
          </p>

          <h6>Diagnosis</h6>
          {sickNote?.diagnoses?.map((dia) => (
            <p style={{ fontSize: 14 }} className="mb-1" key={dia.diagnosis_id}>
              {dia.diagnosis}({dia.status})
            </p>
          ))}
          <p style={{ fontSize: 14 }} className="mt-2">
            {" "}
            {sickNote?.patient?.gender === "Male" ? "He" : "She"} has been unfit
            for work/school from{" "}
            <span className="fw-bold">{sickNote?.start_date}</span> up to and
            including <span className="fw-bold">{sickNote?.end_date}</span>{" "}
          </p>
        </div>
        <div className="d-flex mt-2">
          <div>
            <p>
              <span className="fw-bold">Phyasican Name:</span>{" "}
              {sickNote?.doctor?.employee?.doctor_titer ? (
                <Image
                  src={Host_URL + sickNote?.doctor?.employee?.doctor_titer}
                  fluid
                  width={110}
                />
              ) : (
                "Dr " +
                sickNote?.doctor?.employee?.firstName +
                sickNote?.doctor?.employee?.middleName
              )}
            </p>
            <p className="">
              <span className="fw-bold align-self-start">Signature:</span>{" "}
              <img
                src={Host_URL + sickNote?.doctor?.employee?.digital_signature}
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSickNote;
