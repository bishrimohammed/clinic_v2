import React from "react";
import { useParams } from "react-router-dom";
import useMedicalHistory from "../../../hooks/useMedicalhistory";

const PatientInfornPrint = () => {
  const { historyId } = useParams();
  const { data: history } = useMedicalHistory(historyId);
  let patient = history?.patientId;
  // console.log(patient);
  return (
    <div>
      {/*  <h6>Demography Information</h6> */}
      <div className="ps-2">
        <span className="fw-bold me-1">Patient Name:</span> {patient?.name}
      </div>
      <div className="ps-2">
        <span className="fw-bold me-1">CRN:</span> {patient?.cardNumber}
      </div>
      <div className="ps-2">
        <span className="fw-bold me-1">Age: </span>
        {patient?.age} year
      </div>
      <div className="ps-2">
        <span className="fw-bold me-1">sex:</span> {patient?.gender}
      </div>
      <div className="ps-2">
        <span className="fw-bold me-1">Mobile:</span> {patient?.phone}
      </div>
    </div>
  );
};

export default PatientInfornPrint;
