import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatientSocialHistoryModal from "./AddPatientSocialHistoryModal";
import { MdRemoveRedEye } from "react-icons/md";
import { useGetSocialHistory } from "../../hooks/patientHooks/useGetSocialHistory";

const PatientSocialHistory = ({
  socialHistories,
  patientId,
  medicalRedordId,
}) => {
  const [showAddSocialHistoryModal, setShowAddSocialHistoryModal] =
    useState(false);
  const { data } = useGetSocialHistory(patientId);
  // console.log(socialHistories);
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
            <MdRemoveRedEye size={20} />
          </button>
        </div>

        <div className="allergies-list small fs-9 py-1">
          {data?.map((condition, index) => (
            <span key={index + condition.id}>
              {condition.tobacco_use}
              {index !== socialHistories.length - 1 ? ", " : null}
            </span>
          ))}
        </div>
      </div>
      {showAddSocialHistoryModal && (
        <AddPatientSocialHistoryModal
          handleClose={() => setShowAddSocialHistoryModal(false)}
          show={showAddSocialHistoryModal}
          patientId={patientId}
          socialHistories={data}
        />
      )}
    </>
  );
};

export default PatientSocialHistory;
