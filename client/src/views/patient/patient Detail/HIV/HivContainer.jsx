import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import ChangeHIVStatusModal from "./ChangeHIVStatusModal";

const HivContainer = ({ patient }) => {
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  return (
    <div>
      <div className="d-flex align-items-center">
        {" "}
        <h6 className="mb-0">HIV </h6>
        <button
          className="border-0  bg-transparent"
          onClick={() => setShowChangeStatusModal(true)}
        >
          <MdRemoveRedEye size={20} />
        </button>
      </div>
      {showChangeStatusModal && (
        <ChangeHIVStatusModal
          show={showChangeStatusModal}
          handleClose={() => setShowChangeStatusModal(false)}
          patientId={patient.id}
          // status={patient.has_HIV}
        />
      )}
    </div>
  );
};

export default HivContainer;
