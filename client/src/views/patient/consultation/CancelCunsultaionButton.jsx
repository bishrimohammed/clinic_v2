import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CancelConsultationModal from "./CancelConsultationModal";
import { useLocation } from "react-router-dom";

const CancelCunsultaionButton = ({ medicalRecordId }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  //   const {} = useLocation()
  return (
    <>
      <Button
        variant="danger"
        className="btn-sm"
        // disabled={
        //   !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
        //   isPending
        // }
        // onClick={() => setShowCancelTriageModal(true)}
        onClick={() => {
          setShowCancelModal(true);
        }}
      >
        Cancel
      </Button>
      {showCancelModal && (
        <CancelConsultationModal
          show={showCancelModal}
          handleClose={() => setShowCancelModal(false)}
          medicalRecordId={medicalRecordId}
        />
      )}
    </>
  );
};

export default CancelCunsultaionButton;
