import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddAllergyModal from "./AddAllergyModal";

const PatientAllergies = ({ allergies, patientId }) => {
  const [showAddAllergyModal, setShowAddAllergyModal] = useState(false);
  // console.log("reeeee");
  return (
    <>
      <div className="allergies-section mb-2 mt-2">
        <div className="d-flex align-items-center">
          {" "}
          <h6 className="mb-0">Allergies</h6>
          <button
            variant="primary"
            className="border-0 bg-transparent"
            onClick={() => setShowAddAllergyModal(true)}
          >
            <FaCirclePlus />
          </button>
        </div>

        <div className="allergies-list small">
          {allergies?.map((allergy, index) => (
            <span>
              {allergy.allergy_type}
              {index !== allergies.length - 1 ? ", " : null}
            </span>
          ))}
        </div>
      </div>
      {showAddAllergyModal && (
        <AddAllergyModal
          show={showAddAllergyModal}
          handleClose={() => setShowAddAllergyModal(false)}
          patientId={patientId}
        />
      )}
    </>
  );
};

export default PatientAllergies;
