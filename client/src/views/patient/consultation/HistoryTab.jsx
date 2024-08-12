import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useGetClinicData } from "../hooks/consultationHooks/PatientOverViewHooks/useGetClinicData";
import { useLocation } from "react-router-dom";
import HomeTab from "./HistoryTabs/HomeTab";
import ClinicDataTab from "./HistoryTabs/ClinicDataTab";
import HistoryPrescriptionsTab from "./HistoryTabs/HistoryPrescriptionsTab";
import CertificatesTab from "./HistoryTabs/CertificatesTab";
import LabAndImagingTab from "./HistoryTabs/LabAndImagingTab";
import ProcedureTab from "./HistoryTabs/ProcedureTab";

const HistoryTab = () => {
  const { state } = useLocation();
  const { data } = useGetClinicData(state.patient_id);
  // console.log(data);
  return (
    <div>
      <Tabs
        defaultActiveKey="Home"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom consultationHistory"
        variant="underline"
        // justify
      >
        <Tab eventKey="Home" title="Home">
          <HomeTab patientId={state.patient_id} />
        </Tab>
        <Tab eventKey="clinic Data" title="Clinic Data">
          <ClinicDataTab patientId={state.patient_id} />
        </Tab>
        <Tab eventKey="Prescriptions" title="Prescriptions">
          <HistoryPrescriptionsTab patientId={state.patient_id} />
        </Tab>
        <Tab eventKey="Certificates" title="Certificates">
          <CertificatesTab patientId={state.patient_id} />
        </Tab>
        <Tab eventKey="Lab & Imaging" title="Lab & Imaging">
          <LabAndImagingTab patientId={state.patient_id} />
        </Tab>
        <Tab eventKey="Procuders" title="Procuders">
          <ProcedureTab patientId={state.patient_id} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default HistoryTab;
