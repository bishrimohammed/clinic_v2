import React, { useState } from "react";
import EmployeeBulkImportModal from "./EmployeeBulkImportModal";

const BulkImportButton = () => {
  const [showBulkImportModal, setShowImportModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowImportModal(true)}
        className="btn btn-sm btn-success"
      >
        +Import Employee
      </button>
      {showBulkImportModal && (
        <EmployeeBulkImportModal
          show={showBulkImportModal}
          handleClose={() => setShowImportModal(false)}
        />
      )}
    </>
  );
};

export default BulkImportButton;
