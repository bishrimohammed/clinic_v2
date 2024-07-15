import React from "react";
import { useParams } from "react-router-dom";
import useMedicalHistory from "../../../hooks/useMedicalhistory";
import { differenceInYears } from "date-fns";

const PatientInfornPrint = ({ patient }) => {
  // const { historyId } = useParams();
  // const { data: history } = useMedicalHistory(historyId);
  // let patient = history?.patientId;
  // console.log(patient);
  return (
    <div>
      {/*  <h6>Demography Information</h6> */}
      <div className="ps-2">
        <span className="fw-bold me-1">Patient Name:</span> {patient?.firstName}
      </div>
      <div className="ps-2">
        <span className="fw-bold me-1">Id:</span> {patient?.card_number}
      </div>
      <div className="ps-2">
        <span className="fw-bold me-1">Age: </span>
        {differenceInYears(new Date(), patient?.birth_date)} year
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
