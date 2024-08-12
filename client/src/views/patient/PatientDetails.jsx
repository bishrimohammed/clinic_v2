//import { Button } from "@coreui/coreui";
import React, { useState } from "react";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import useGetPatient from "./hooks/useGetPatient";
import PatientInfo from "./patient detail over view/PatientInfo";
import AllHistoryOverview from "./patient detail over view/AllHistoryOverview";
import AllLaboratoryOverview from "./patient detail over view/AllLaboratoryOverview";
import AllImagingStudiesOverview from "./patient detail over view/AllImagingStudiesOverview";
import { IoMdArrowRoundBack } from "react-icons/io";
import ClinicDataTab from "./consultation/HistoryTabs/ClinicDataTab";
import HistoryPrescriptionsTab from "./consultation/HistoryTabs/HistoryPrescriptionsTab";
import CertificatesTab from "./consultation/HistoryTabs/CertificatesTab";
import LabAndImagingTab from "./consultation/HistoryTabs/LabAndImagingTab";
import ProcedureTab from "./consultation/HistoryTabs/ProcedureTab";
// import ProcedureTab from "./consultation/ProcedureTab";

const PatientDetails = () => {
  const [key, setKey] = useState("active");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: patient, error, isPending, isError } = useGetPatient(id);
  console.log(patient);
  if (isPending) return <Spinner animation="grow" />;
  if (isError) return <div>error {error.message}</div>;
  return (
    <>
      <Container className="p-2 mb-5">
        <div className="p-3 bg-hrun-box hrunboxshadow">
          <div className=" d-flex gap-3 align-items-center">
            <IoMdArrowRoundBack
              className="cursorpointer"
              size={22}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            <h4>View Patient Visit Detail</h4>
          </div>{" "}
          <hr />
          <>
            <div style={{ gap: 5 }} className="d-flex flex-column">
              <PatientInfo patient={patient} />
              <div
                style={{
                  //borderRadius: 10,
                  borderTop: `2px solid rgb(50, 31, 219)`,
                  backgroundColor: "white",
                }}
                className="flex-grow-1 px-3 py-3 "
              >
                <h5 className="border-bottom border-bottom-1 border-2 pb-2 mt-2">
                  Patient Over View
                </h5>
                {/* <AllHistoryOverview medicalRecords={patient.medicalRecords} /> */}
                <Tabs
                  defaultActiveKey="Clinic Data"
                  id="uncontrolled-tab-example"
                  className="mb-3 mt-2 border-bottom consultationHistory"
                  variant="underline"
                  // justify
                >
                  {/* <Tab eventKey="Home" title="Home">
          <HomeTab patientId={state.patient_id} />
        </Tab> */}
                  <Tab eventKey="Clinic Data" title="Clinic Data">
                    <ClinicDataTab patientId={patient?.id} />
                  </Tab>
                  <Tab eventKey="Prescriptions" title="Prescriptions">
                    <HistoryPrescriptionsTab patientId={patient?.id} />
                  </Tab>
                  <Tab eventKey="Certificates" title="Certificates">
                    <CertificatesTab patientId={patient?.id} />
                  </Tab>
                  <Tab eventKey="Lab & Imaging" title="Lab & Imaging">
                    <LabAndImagingTab patientId={patient?.id} />
                  </Tab>
                  <Tab eventKey="Procuders" title="Procuders">
                    <ProcedureTab patientId={patient?.id} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </>
        </div>
      </Container>
    </>
  );
};

export default PatientDetails;
