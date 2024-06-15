import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatientPastMedicalHistory from "./AddPatientPastMedicalHistory";

const PatientPastMedicalHistory = ({ patientId, pastMedicalHistories }) => {
  const [showAddPastMedicalHistory, setShowAddPastMedicalHistory] =
    useState(false);
  // console.log(pastMedicalHistories);
  return (
    <>
      <div className="current-medication-section mb-2">
        <div className="d-flex align-items-center">
          {" "}
          <h6 className="mb-0">Past medical history</h6>
          <button
            variant="primary"
            className="border-0 bg-transparent"
            onClick={() => setShowAddPastMedicalHistory(true)}
          >
            <FaCirclePlus />
          </button>
        </div>

        <div className="allergies-list small py-1">
          {pastMedicalHistories?.map((pastMedicalHistory) => (
            <div className="d-flex align-items-center">
              <span>{pastMedicalHistory.medical_condition}</span>
            </div>
          ))}
          {/* <span>Hypertension </span>
          <span>Diabetes Type 2 </span> */}
        </div>
      </div>
      {showAddPastMedicalHistory && (
        <AddPatientPastMedicalHistory
          show={showAddPastMedicalHistory}
          handleClose={() => setShowAddPastMedicalHistory(false)}
          patientId={patientId}
        />
      )}
    </>
  );
};

export default PatientPastMedicalHistory;
