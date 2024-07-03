import React, { useMemo, useState } from "react";
import PatientVisitTable from "./PatientVisitTable";
import { useGetPatientVisits } from "./hooks/useGetPatientVisits";
import AddPatientVisitModal from "./AddPatientVisitModal";
import FilterVisitModal from "./FilterVisitModal";
import CancelPatientVisitModal from "./CancelPatientVisitModal";
import TransferPatientVisitModal from "./TransferPatientVisitModal";
import { Tab, Tabs } from "react-bootstrap";
import UpcomingPatientVisitTable from "./UpcomingPatientVisitTable";

const PatientVisitList = () => {
  const [filter, setFilter] = useState({
    stage: "",
    status: "",
    vistiType: "",
  });
  const { data } = useGetPatientVisits(filter);
  const visits = useMemo(() => data || [], [data]);
  const [showAddPatientVisitModal, setShowAddPatientVisitModal] =
    useState(false);
  const [showFilterVisitModal, setShowFilterVisitModal] = useState(false);
  const [showCancelPatientVisitModal, setShowCancelPatientVisitModal] =
    useState({
      isShow: false,
      visitId: null,
    });
  const [
    showTransferredPatientVisitModal,
    setShowTransferredPatientVisitModal,
  ] = useState({
    isShow: false,
    visit: null,
  });
  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        // activeKey={key}
        defaultActiveKey="Active Visits"
        // onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Active Visits" title="Active Visits">
          <UpcomingPatientVisitTable />
        </Tab>
        <Tab eventKey="previous visit" title="All Visits">
          <PatientVisitTable
            patientVisits={visits}
            setShowAddPatientVisitModal={setShowAddPatientVisitModal}
            setShowFilterModal={setShowFilterVisitModal}
            setFilter={setFilter}
            setShowCancelPatientVisitModal={setShowCancelPatientVisitModal}
            setShowTransferredPatientVisitModal={
              setShowTransferredPatientVisitModal
            }
          />
        </Tab>
      </Tabs>

      {showFilterVisitModal && (
        <FilterVisitModal
          show={showFilterVisitModal}
          handleClose={() => setShowFilterVisitModal(false)}
          setFilter={setFilter}
        />
      )}
      {showCancelPatientVisitModal.isShow && (
        <CancelPatientVisitModal
          show={showCancelPatientVisitModal.isShow}
          handleClose={() =>
            setShowCancelPatientVisitModal({ isShow: false, visitId: null })
          }
          visitId={showCancelPatientVisitModal.visitId}
        />
      )}
      {showTransferredPatientVisitModal.isShow && (
        <TransferPatientVisitModal
          show={showTransferredPatientVisitModal.isShow}
          handleClose={() =>
            setShowTransferredPatientVisitModal({
              isShow: false,
              visit: null,
            })
          }
          visit={showTransferredPatientVisitModal.visit}
        />
      )}
    </div>
  );
};

export default PatientVisitList;
