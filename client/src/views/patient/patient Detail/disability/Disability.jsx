import React, { useState } from "react";
import ChangeDisabilityModal from "./ChangeDisabilityModal";
import { MdRemoveRedEye } from "react-icons/md";

const Disability = ({ patientId }) => {
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
      {showChangeStatusModal && (
        <ChangeDisabilityModal
          show={showChangeStatusModal}
          handleClose={() => setShowChangeStatusModal(false)}
          patientId={patientId}
          // status={patient.has_HIV}
        />
      )}
    </div>
  );
};

export default Disability;
