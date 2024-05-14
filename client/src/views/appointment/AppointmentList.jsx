import React, { useMemo, useState } from "react";
import AppointmentTable from "./AppointmentTable";
import AddAppointmentModal from "./AddAppointmentModal";
import { useGetAppointments } from "./hooks/useGetAppointments";
import FilterAppointmentModal from "./FilterAppointmentModal";
import CancelAppointmantModal from "./CancelAppointmantModal";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import ViewAppointmentModal from "./ViewAppointmentModal";

const AppointmentList = () => {
  const [showAddAppointmentModal, setShowAddAppointmentModal] =
    React.useState(false);
  const [filter, setFilter] = useState({ status: "" });
  // const [showFilterModal,setShowFilterModal] = useState(false)
  const { data, isPending } = useGetAppointments(filter);
  const [showCancleAppointmentModal, setShowCancleAppointmentModal] = useState({
    isShow: false,
    appointmentId: null,
  });
  const [showUpdateAppointmentModal, setShowUpdateAppointmentModal] = useState({
    isShow: false,
    appointment: null,
  });
  const [showViewAppointment, setShowViewAppointment] = useState({
    isShow: false,
    appointment: null,
  });
  const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] = useState({
    isShow: false,
    appointmentId: null,
  });
  const [showFilterAppointmentModal, setShowFilterAppointmentModal] =
    useState(false);
  const appointments = useMemo(() => data || [], [data, isPending]);
  // console.log(showCancleAppointmentModal);
  return (
    <div>
      <AppointmentTable
        setShowAddAppointmentModal={setShowAddAppointmentModal}
        appointments={appointments}
        isPending={isPending}
        setShowFilterModal={setShowFilterAppointmentModal}
        setFilter={setFilter}
        setShowCancleAppointmentModal={setShowCancleAppointmentModal}
        setShowUpdateAppointmentModal={setShowUpdateAppointmentModal}
        setShowDeleteAppointmentModal={setShowDeleteAppointmentModal}
        setShowViewAppointment={setShowViewAppointment}
      />
      {showAddAppointmentModal && (
        <AddAppointmentModal
          show={showAddAppointmentModal}
          handleClose={() => setShowAddAppointmentModal(false)}
        />
      )}
      {showFilterAppointmentModal && (
        <FilterAppointmentModal
          show={showFilterAppointmentModal}
          handleClose={() => setShowFilterAppointmentModal(false)}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      {showCancleAppointmentModal.isShow && (
        <CancelAppointmantModal
          show={showCancleAppointmentModal.isShow}
          handleClose={() =>
            setShowCancleAppointmentModal({
              isShow: false,
              appointmentId: null,
            })
          }
          appointmentId={showCancleAppointmentModal.appointmentId}
        />
      )}
      {showUpdateAppointmentModal.isShow && (
        <UpdateAppointmentModal
          show={showUpdateAppointmentModal.isShow}
          handleClose={() =>
            setShowUpdateAppointmentModal({
              isShow: false,
              appointment: null,
            })
          }
          appointment={showUpdateAppointmentModal.appointment}
        />
      )}
      {showDeleteAppointmentModal.isShow && (
        <DeleteAppointmentModal
          show={showDeleteAppointmentModal.isShow}
          handleClose={() =>
            setShowDeleteAppointmentModal({
              isShow: false,
              appointmentId: null,
            })
          }
          appointmentId={showDeleteAppointmentModal.appointmentId}
        />
      )}
      {showViewAppointment.isShow && (
        <ViewAppointmentModal
          show={showViewAppointment.isShow}
          handleClose={() =>
            setShowViewAppointment({
              isShow: false,
              appointment: null,
            })
          }
          appointment={showViewAppointment.appointment}
        />
      )}
    </div>
  );
};

export default AppointmentList;
