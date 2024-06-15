import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddNewApprovalSettingModal from "./AddNewApprovalSettingModal";

const AddApprovalSettingButton = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <>
      <Button className="btn-sm ms-auto " onClick={() => setShowAddModal(true)}>
        {"  "}
        +Add Approval Setting
      </Button>
      {showAddModal && (
        <AddNewApprovalSettingModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};

export default AddApprovalSettingButton;
