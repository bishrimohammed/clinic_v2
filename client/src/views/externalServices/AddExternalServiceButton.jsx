import React, { useState } from "react";
import AddExternalServiceModal from "./AddExternalServiceModal";

const AddExternalServiceButton = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-end">
        {" "}
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
        >
          +Add
        </button>
      </div>
      {showAddModal && (
        <AddExternalServiceModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};

export default AddExternalServiceButton;
