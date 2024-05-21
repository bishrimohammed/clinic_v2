import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatientPastMedicalHistory from "./AddPatientPastMedicalHistory";

const PatientPastMedicalHistory = () => {
  const [showAddPastMedicalHistory, setShowAddPastMedicalHistory] =
    useState(false);
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
          <span>Hypertension </span>
          <span>Diabetes Type 2 </span>
        </div>
      </div>
      {showAddPastMedicalHistory && (
        <AddPatientPastMedicalHistory
          show={showAddPastMedicalHistory}
          handleClose={() => setShowAddPastMedicalHistory(false)}
        />
      )}
    </>
  );
};

export default PatientPastMedicalHistory;
