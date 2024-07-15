import React, { useState } from "react";
import { FaPrint } from "react-icons/fa6";
import PrescriptionPrintPreviewModal from "./PrescriptionPrintPreviewModal";

const PrintPrescriptionButton = ({ patient, prescriptions }) => {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <button
        disabled={prescriptions?.length === 0}
        onClick={() => setShowPreview(true)}
        type="button"
        className="btn btn-success btn-sm d-flex align-items-center gap-2 me-3 "
      >
        <FaPrint />
        Print
      </button>
      {showPreview && (
        <PrescriptionPrintPreviewModal
          show={showPreview}
          handleClose={() => setShowPreview(false)}
          patient={patient}
          prescriptions={prescriptions}
        />
      )}
    </>
  );
};

export default PrintPrescriptionButton;
