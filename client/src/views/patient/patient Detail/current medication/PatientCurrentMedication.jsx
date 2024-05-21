import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatientCurrentMedicationModal from "./AddPatientCurrentMedicationModal";

const PatientCurrentMedication = () => {
  // const [showAddCurrentMedicationModal, showAddCurrentMedicationModal] = useState()
  const [showAddCurrentMedicationModal, setShowAddCurrentMedicationModal] =
    useState();

  return (
    <>
      <div className="current-medication-section mb-2">
        <div className="d-flex align-items-center">
          {" "}
          <h6 className="mb-0">Current Medication</h6>
          <button
            variant="primary"
            className="border-0 bg-transparent"
            onClick={() => setShowAddCurrentMedicationModal(true)}
          >
            <FaCirclePlus />
          </button>
        </div>

        <div className="allergies-list small">
          <span>Ibuprofen, </span>
          <span>Cetirizine , </span>
          <span>Omega , </span>
        </div>
      </div>
      {showAddCurrentMedicationModal && (
        <AddPatientCurrentMedicationModal
          show={showAddCurrentMedicationModal}
          handleClose={() => setShowAddCurrentMedicationModal(false)}
        />
      )}
    </>
  );
};

export default PatientCurrentMedication;
