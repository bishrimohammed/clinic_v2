import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddVitalSignModal from "./AddVitalSignModal";
import { useLocation } from "react-router-dom";

const AddVitalSignButton = () => {
  const [showAddVitalSignModa, setShowAddVitalSignModal] = useState(false);
  const { state } = useLocation();
  return (
    <>
      <Button
        onClick={() => {
          setShowAddVitalSignModal(true);
        }}
        className="btn-sm"
      >
        +Add Vital Sign
      </Button>
      {showAddVitalSignModa && (
        <AddVitalSignModal
          show={showAddVitalSignModa}
          handleClose={() => setShowAddVitalSignModal(false)}
          medicalRecordId={state.medicalRecord_id}
          //   vitalSignFieldNames={vitalSignFieldNames}
        />
      )}
    </>
  );
};

export default AddVitalSignButton;
