import React, { useState } from "react";
import LabPrintPreviewModal from "./LabPrintPreviewModal";
import { FaPrint } from "react-icons/fa6";
const PrintLabResultButton = ({ disabled, patient, labTests }) => {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setShowPreview(true)}
        type="button"
        className="btn btn-success btn-sm d-flex align-items-center gap-2 me-3 "
      >
        <FaPrint />
        Print
      </button>
      {showPreview && (
        <LabPrintPreviewModal
          show={showPreview}
          handleClose={() => setShowPreview(false)}
          patient={patient}
          labTests={labTests}
        />
      )}
    </>
  );
};

export default PrintLabResultButton;
