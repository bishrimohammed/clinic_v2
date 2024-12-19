import React from "react";
import { hasPermission } from "../../utils/hasPermission";
import AddAppointmentModal from "./AddAppointmentModal";

const AddAppointmentBtn = () => {
  const [showAddAppointmentModal, setShowAddAppointmentModal] =
    React.useState(false);
  return (
    <>
      <div className="d-flex justify-content-between gap-2 align-items-center w-100 mb-1 mt-2">
        {hasPermission("Appointment", "create") && (
          <Button
            className="btn btn-sm btn-primary ms-auto"
            onClick={() => setShowAddAppointmentModal(true)}
          >
            +Add Appointment
          </Button>
        )}
      </div>
      {showAddAppointmentModal && (
        <AddAppointmentModal
          show={showAddAppointmentModal}
          handleClose={() => setShowAddAppointmentModal(false)}
        />
      )}
    </>
  );
};

export default AddAppointmentBtn;
