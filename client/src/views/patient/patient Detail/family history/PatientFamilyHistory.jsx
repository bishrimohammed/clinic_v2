import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatientFamilyHistoryModal from "./AddPatientFamilyHistoryModal";

const PatientFamilyHistory = ({ familyHistories, patientId }) => {
  const [showAddFamilyHistoryModal, setShowAddFamilyHistoryModal] =
    useState(false);
  return (
    <>
      <div className="family-history-section mb-2">
        <div className="d-flex align-items-center">
          {" "}
          <h6 className="mb-0">Family history </h6>
          <button
            className="border-0  bg-transparent"
            onClick={() => setShowAddFamilyHistoryModal(true)}
          >
            <FaCirclePlus />
          </button>
        </div>

        <div className="allergies-list small fs-9 py-1">
          {familyHistories?.map((condition, index) => (
            <span key={index + condition.id}>
              {condition.medical_condition}
              {index !== familyHistories.length - 1 ? ", " : null}
            </span>
          ))}
          {/* <span>Hypertension, </span>
          <span>Diabetes Type 2 </span> */}
        </div>
      </div>
      {showAddFamilyHistoryModal && (
        <AddPatientFamilyHistoryModal
          show={showAddFamilyHistoryModal}
          handleClose={() => setShowAddFamilyHistoryModal(false)}
          patientId={patientId}
        />
      )}
    </>
  );
};

export default PatientFamilyHistory;
