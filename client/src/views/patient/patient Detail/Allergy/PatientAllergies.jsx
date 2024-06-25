import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddAllergyModal from "./AddAllergyModal";
import PatientAllergyDetails from "./PatientAllergyDetails";
import { useGetPatientAllergy } from "../../hooks/allergyHooks/useGetPatientAllergy";

const PatientAllergies = ({ allergies, patientId }) => {
  const [showAddAllergyModal, setShowAddAllergyModal] = useState(false);
  const { data } = useGetPatientAllergy(patientId);
  console.log(allergies);
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
            <span
              key={allergy.id}
              className={`${
                String(allergy.severity).toLowerCase() === "severe"
                  ? "text-danger"
                  : ""
              }`}
            >
              <div>
                {" "}
                {allergy.allergy_type} {`(${allergy.severity})`}{" "}
              </div>
              {/* {"\n "}
              {index !== allergies.length - 1 ? "\n" : null} */}
            </span>
          ))}
        </div>
      </div>
      {/* {showAddAllergyModal && (
        <AddAllergyModal
          show={showAddAllergyModal}
          handleClose={() => setShowAddAllergyModal(false)}
          patientId={patientId}
        />
      )} */}
      {showAddAllergyModal && (
        <PatientAllergyDetails
          show={showAddAllergyModal}
          handleClose={() => setShowAddAllergyModal(false)}
          patientId={patientId}
          allergies={data}
        />
      )}
    </>
  );
};

export default PatientAllergies;
