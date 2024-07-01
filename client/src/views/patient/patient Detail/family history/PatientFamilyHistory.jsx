import React, { useState } from "react";
// import { FaCirclePlus } from "react-icons/fa6";
import AddPatientFamilyHistoryModal from "./AddPatientFamilyHistoryModal";
import { MdRemoveRedEye } from "react-icons/md";
import { useGetFamilyHistory } from "../../hooks/patientHooks/useGetFamilyHistory";

const PatientFamilyHistory = ({ familyHistories, patientId }) => {
  const [showAddFamilyHistoryModal, setShowAddFamilyHistoryModal] =
    useState(false);
  const { data } = useGetFamilyHistory(patientId);
  console.log(patientId);
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
            <MdRemoveRedEye size={20} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((FH, index) => (
              <tr key={FH.id}>
                <td>
                  {FH.medical_condition}({FH.relationship})
                </td>
                {/* // <td>{FH.relationship}</td> */}
              </tr>
              // <span key={index + condition.id}>
              //   {condition.medical_condition}
              //   {index !== familyHistories.length - 1 ? ", " : null}
              // </span>
            ))}
          </tbody>
        </table>
      </div>
      {showAddFamilyHistoryModal && (
        <AddPatientFamilyHistoryModal
          show={showAddFamilyHistoryModal}
          handleClose={() => setShowAddFamilyHistoryModal(false)}
          patientId={patientId}
          familyHistories={data}
        />
      )}
    </>
  );
};

export default PatientFamilyHistory;
