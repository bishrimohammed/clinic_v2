/* eslint-disable react/prop-types */
import { Container, Spinner } from "react-bootstrap";

import React, { useMemo, useState } from "react";

import PatientTable from "./PatientTable";
import { useGetPatients } from "./hooks/patientHooks/useGetPatients";
import ViewPatientModal from "./ViewPatientModal";
import PatientDeactivateModal from "./PatientDeactivateModal";
import PatientFilterModal from "./PatientFilterModal";

const PatientList = () => {
  const [showViewPatient, setShowViewPatient] = useState({
    isShow: false,
    patient: null,
  });
  const [filter, setFilter] = useState({
    is_new: "",
    is_credit: "",
    gender: "",
    status: "",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState({
    isShow: false,
    id: null,
    action: "",
  });
  const { data, isLoading, isError, isFetching, isPending } =
    useGetPatients(filter);
  const patients = useMemo(() => data || [], [data, isFetching, isPending]);
  // console.log(filter);
  return (
    <>
      <Container className="p-3 mb-5">
        <div className="p-3 bg-hrun-box">
          <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
            <h4 className="d-flex justify-content-center align-items-center mb-0">
              Patients List
            </h4>
            {/* {hasPermission("patient", "create") && (
              <Link to="/patients/newpatient" className="btn btn-primary">
                Add Patient
              </Link>
            )} */}
          </div>
          <hr />
          {/* <SearchInput searchvalue={search} setSearch={setSearch} /> */}
          {/* <MemoizedPatientLists searchValue={debouncedValue} /> */}
          <PatientTable
            patients={patients}
            isPending={isPending}
            setShowViewPatient={setShowViewPatient}
            setShowFilterModal={setShowFilterModal}
            setShowDeactivateModal={setShowDeactivateModal}
            setFilter={setFilter}
          />
        </div>
        {showViewPatient.isShow && (
          <ViewPatientModal
            show={showViewPatient.isShow}
            handleClose={() =>
              setShowViewPatient({ isShow: false, patient: null })
            }
            patient={showViewPatient.patient}
          />
        )}
        {showDeactivateModal.isShow && (
          <PatientDeactivateModal
            show={showDeactivateModal.isShow}
            handleClose={setShowDeactivateModal}
            patientId={showDeactivateModal.patientId}
            action={showDeactivateModal.action}
          />
        )}
        {showFilterModal && (
          <PatientFilterModal
            show={showFilterModal}
            handleClose={setShowFilterModal}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </Container>

      {/* <Container className="p-3">
        <div className="p-3 bg-hrun-box">
          <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
            <h4 className="d-flex justify-content-center align-items-center mb-0">
              Patients List
            </h4>
            {currentUser.role === "cashier" && (
              <Link to="/patient/newpatient" className="btn btn-primary">
                Add Patient
              </Link>
            )}
          </div>
          <StripedRowExample />
        </div>
      </Container> */}
    </>
  );
};

export default PatientList;
