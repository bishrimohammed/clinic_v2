import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import ChangeHIVStatusModal from "./ChangeHIVStatusModal";
import { getBrandColor } from "../../../../utils/getBrandColor";

const HivContainer = ({ patient }) => {
  // console.log(patient);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  return (
    <div>
      <div className="d-flex align-items-center">
        {" "}
        <h6 style={{ color: getBrandColor() }} className="mb-0">
          HIV{" "}
        </h6>
        <button
          className="border-0  bg-transparent"
          onClick={() => setShowChangeStatusModal(true)}
        >
          <MdRemoveRedEye size={20} />
        </button>
      </div>
      <p style={{ fontSize: 14 }}>{patient?.has_HIV ? "Yes" : "No"}</p>
      {showChangeStatusModal && (
        <ChangeHIVStatusModal
          show={showChangeStatusModal}
          handleClose={() => setShowChangeStatusModal(false)}
          patientId={patient.id}
          status={patient.has_HIV}
        />
      )}
    </div>
  );
};

export default HivContainer;
