import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatientSocialHistoryModal from "./AddPatientSocialHistoryModal";

const PatientSocialHistory = ({ socialHistories, patientId }) => {
  const [showAddSocialHistoryModal, setShowAddSocialHistoryModal] =
    useState(false);
  return (
    <>
      <div className="social-history-section mb-2">
        <div className="d-flex align-items-center">
          {" "}
          <h6 className="mb-0">Social history </h6>
          <button
            className="border-0  bg-transparent"
            onClick={() => setShowAddSocialHistoryModal(true)}
          >
            <FaCirclePlus />
          </button>
        </div>

        <div className="allergies-list small fs-9 py-1">
          <span>smoke, </span>
        </div>
      </div>
      {showAddSocialHistoryModal && (
        <AddPatientSocialHistoryModal
          handleClose={() => setShowAddSocialHistoryModal(false)}
          show={showAddSocialHistoryModal}
          patientId={patientId}
        />
      )}
    </>
  );
};

export default PatientSocialHistory;
