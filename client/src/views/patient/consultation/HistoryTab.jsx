import React, { useState } from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useGetClinicData } from "../hooks/consultationHooks/PatientOverViewHooks/useGetClinicData";
import { useLocation } from "react-router-dom";
const HomeTab = React.lazy(() => import("./HistoryTabs/HomeTab"));
const ClinicDataTab = React.lazy(() => import("./HistoryTabs/ClinicDataTab"));
const HistoryPrescriptionsTab = React.lazy(() =>
  import("./HistoryTabs/HistoryPrescriptionsTab")
);
const CertificatesTab = React.lazy(() =>
  import("./HistoryTabs/CertificatesTab")
);
const LabAndImagingTab = React.lazy(() =>
  import("./HistoryTabs/LabAndImagingTab")
);
const ProcedureTab = React.lazy(() => import("./HistoryTabs/ProcedureTab"));

const HistoryTab = () => {
  const { state } = useLocation();
  const [key, setKey] = useState("Home");
  // const { data } = useGetClinicData(state.patient_id);
  // console.log(data);
  return (
    <div>
      <Tabs
        // defaultActiveKey="Home"
        activeKey={key}
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom consultationHistory"
        variant="underline"
        onSelect={(k) => setKey(k)}
        // justify
      >
        <Tab eventKey="Home" title="Home">
          <React.Suspense fallback={<Spinner color="primary" />}>
            {key === "Home" && <HomeTab patientId={state.patient_id} />}
          </React.Suspense>
          {/* <HomeTab patientId={state.patient_id} /> */}
        </Tab>
        <Tab eventKey="clinic Data" title="Clinic Data">
          <React.Suspense fallback={<Spinner color="primary" />}>
            {key === "clinic Data" && (
              <ClinicDataTab patientId={state.patient_id} />
            )}
          </React.Suspense>
          {/* <ClinicDataTab patientId={state.patient_id} /> */}
        </Tab>
        <Tab eventKey="Prescriptions" title="Prescriptions">
          <React.Suspense fallback={<Spinner color="primary" />}>
            {key === "Prescriptions" && (
              <HistoryPrescriptionsTab patientId={state.patient_id} />
            )}
          </React.Suspense>
          {/* <HistoryPrescriptionsTab patientId={state.patient_id} /> */}
        </Tab>
        <Tab eventKey="Certificates" title="Certificates">
          <React.Suspense fallback={<Spinner color="primary" />}>
            {key === "Certificates" && (
              <CertificatesTab patientId={state.patient_id} />
            )}
          </React.Suspense>
          {/* <CertificatesTab patientId={state.patient_id} /> */}
        </Tab>
        <Tab eventKey="Lab & Imaging" title="Lab & Imaging">
          <React.Suspense fallback={<Spinner color="primary" />}>
            {key === "Lab & Imaging" && (
              <LabAndImagingTab patientId={state.patient_id} />
            )}
          </React.Suspense>
          {/* <LabAndImagingTab patientId={state.patient_id} /> */}
        </Tab>
        <Tab eventKey="Procuders" title="Procuders">
          <React.Suspense fallback={<Spinner color="primary" />}>
            {key === "Procuders" && (
              <ProcedureTab patientId={state.patient_id} />
            )}
          </React.Suspense>
          {/* <ProcedureTab patientId={state.patient_id} /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default HistoryTab;
