import React, { useMemo, useState } from "react";
import AppointmentTable from "./AppointmentTable";
import CancelAppointmantModal from "./CancelAppointmantModal";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import ViewAppointmentModal from "./ViewAppointmentModal";

const AppointmentList = () => {
  // const [showCancleAppointmentModal, setShowCancleAppointmentModal] = useState({
  //   isShow: false,
  //   appointmentId: null,
  // });
  // const [showUpdateAppointmentModal, setShowUpdateAppointmentModal] = useState({
  //   isShow: false,
  //   appointment: null,
  // });
  // const [showViewAppointment, setShowViewAppointment] = useState({
  //   isShow: false,
  //   appointment: null,
  // });
  // const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] = useState({
  //   isShow: false,
  //   appointmentId: null,
  // });

  // console.log(showCancleAppointmentModal);
  return (
    <div>
      <AppointmentTable
      // setShowAddAppointmentModal={setShowAddAppointmentModal}
      // data={data}
      // isPending={isPending}
      // setShowFilterModal={setShowFilterAppointmentModal}
      // setFilter={setFilter}
      // setShowCancleAppointmentModal={setShowCancleAppointmentModal}
      // setShowUpdateAppointmentModal={setShowUpdateAppointmentModal}
      // setShowDeleteAppointmentModal={setShowDeleteAppointmentModal}
      // setShowViewAppointment={setShowViewAppointment}
      // setPagination={setPagination}
      />

      {/* {showFilterAppointmentModal && (
        <FilterAppointmentModal
          show={showFilterAppointmentModal}
          handleClose={() => setShowFilterAppointmentModal(false)}
          filter={filter}
          setFilter={setFilter}
        />
      )} */}
      {/* {showCancleAppointmentModal.isShow && (
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
      )} */}
    </div>
  );
};

export default AppointmentList;
