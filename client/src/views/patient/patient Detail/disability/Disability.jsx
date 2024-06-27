import React, { useState } from "react";
import ChangeDisabilityModal from "./ChangeDisabilityModal";
import { MdRemoveRedEye } from "react-icons/md";

const Disability = ({ patient }) => {
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  return (
    <div>
      <div className="d-flex align-items-center">
        {" "}
        <h6 className="mb-0">Disability </h6>
        <button
          className="border-0  bg-transparent"
          onClick={() => setShowChangeStatusModal(true)}
        >
          <MdRemoveRedEye size={20} />
        </button>
      </div>
      <p style={{ fontSize: 14 }}>{patient?.disability}</p>
      {showChangeStatusModal && (
        <ChangeDisabilityModal
          show={showChangeStatusModal}
          handleClose={() => setShowChangeStatusModal(false)}
          patientId={patient.id}
          // status={patient.has_HIV}
        />
      )}
    </div>
  );
};

export default Disability;
