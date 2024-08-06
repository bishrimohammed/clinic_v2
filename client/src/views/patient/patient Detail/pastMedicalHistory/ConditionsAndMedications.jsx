import React, { useState } from "react";
import AddConditionsAndMedicationsModal from "./AddConditionsAndMedicationsModal";
import { useGetCurrenMedication } from "../../hooks/ConditionsAndMedicationsHooks/useGetCurrenMedication";
import { useGetDiscontinuedMedication } from "../../hooks/ConditionsAndMedicationsHooks/useGetDiscontinuedMedication";
import { useGetPastMedicalHistory } from "../../hooks/ConditionsAndMedicationsHooks/useGetPastMedicalHistory";
import { useLocation } from "react-router-dom";
// import { FaCirclePlus } from "react-icons/fa6";
// import { LuEye } from "react-icons/lu";
import { MdRemoveRedEye } from "react-icons/md";
import { getBrandColor } from "../../../../utils/getBrandColor";
const ConditionsAndMedications = ({ patientId, medicalRecordId }) => {
  const { state } = useLocation();
  console.log(state);
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: currentmedications } = useGetCurrenMedication(
    state.medicalRecord_id
  );
  const { data: discontinued_medications } = useGetDiscontinuedMedication(
    state.medicalRecord_id
  );
  const { data: pastmedicalHistories } = useGetPastMedicalHistory(
    state.patient_id || patientId
  );
  // console.log(state);
  return (
    <div>
      {/* <button onClick={() => setShowAddModal(true)}>Add</button> */}
      <div className="d-flex align-items-center">
        {" "}
        <h6 style={{ color: getBrandColor() }} className="mb-0">
          Conditions & Medications
        </h6>
        <button
          variant="primary"
          className="border-0 bg-transparent"
          onClick={() => setShowAddModal(true)}
        >
          <MdRemoveRedEye size={20} />
        </button>
      </div>
      <h6 style={{ fontSize: 15 }} className="text-white mt-2">
        <span
          style={{ backgroundColor: "rgb(192,192,192)" }}
          className="p-1 mt-2"
        >
          Current condition
        </span>{" "}
      </h6>
      {currentmedications?.map((cm, index) => (
        <div key={cm.id} className="py-1">
          <h6 className="mb-0">{cm.condition}</h6>
          <p style={{ fontSize: 15 }} className="mb-0">
            {cm.treatment}
          </p>
        </div>
      ))}
      {currentmedications?.length === 0 && <p>None</p>}
      <h6 style={{ fontSize: 15 }} className="text-white mt-2">
        <span
          style={{ backgroundColor: "rgb(192,192,192)" }}
          className="p-1 mt-2"
        >
          Discontinued medication
        </span>{" "}
      </h6>
      {discontinued_medications?.map((dm, index) => (
        <div key={dm.id} className="py-1">
          {/* <h6 className="mb-0">{dm.medication_name}</h6> */}
          <p style={{ fontSize: 15 }} className="mb-0">
            {dm.medication_name}
          </p>
        </div>
      ))}
      {discontinued_medications?.length === 0 && <p>None</p>}
      <h6 style={{ fontSize: 15 }} className="text-white mt-2">
        <span
          style={{ backgroundColor: "rgb(192,192,192)" }}
          className="p-1 mt-2"
        >
          Previous conditions
        </span>{" "}
      </h6>
      {pastmedicalHistories?.map((cm, index) => (
        <div key={cm.id} className="py-1">
          <h6 className="mb-0">{cm.medical_condition}</h6>
          <p style={{ fontSize: 15 }} className="mb-0">
            {cm.treatment}
          </p>
        </div>
      ))}
      {pastmedicalHistories?.length === 0 && <p>None</p>}
      {showAddModal && (
        <AddConditionsAndMedicationsModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          currentmedications={currentmedications}
          discontinued_medications={discontinued_medications}
          pastmedicalHistories={pastmedicalHistories}
          medicalRecordId={state.medicalRecord_id}
          patientId={state.patient_id}
        />
      )}
    </div>
  );
};

export default ConditionsAndMedications;
