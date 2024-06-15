import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import AddExternalLabInvestigationModal from "../investigation/AddExternalLabInvestigationModal";

const OrderExternalLabInvestigation = () => {
  const [showAddLabModal, setShowLabModal] = useState(false);
  return (
    <div>
      <h5 className="d-flex gap-2 mb-3">
        <span className="border-bottom border-dark py-2">
          External Lab Investigation
        </span>
        <button
          onClick={() => setShowLabModal(true)}
          className="border-0  bg-transparent "
        >
          <FaPlusCircle size={18} className="text-primary " />
        </button>
      </h5>
      {showAddLabModal && (
        <AddExternalLabInvestigationModal
          show={showAddLabModal}
          handleClose={() => setShowLabModal(false)}
        />
      )}
    </div>
  );
};

export default OrderExternalLabInvestigation;
