//import { Button } from "@coreui/coreui";
import React, { useState } from "react";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";

import useGetPatient from "./hooks/useGetPatient";
import PatientInfo from "./patient detail over view/PatientInfo";
import AllHistoryOverview from "./patient detail over view/AllHistoryOverview";
import AllLaboratoryOverview from "./patient detail over view/AllLaboratoryOverview";
import AllImagingStudiesOverview from "./patient detail over view/AllImagingStudiesOverview";

const PatientDetails = () => {
  const [key, setKey] = useState("active");
  const { id } = useParams();
  const { data: patient, error, isPending, isError } = useGetPatient(id);
  // console.log(patient);
  if (isPending) return <Spinner animation="grow" />;
  if (isError) return <div>error {error.message}</div>;
  return (
    <>
      <Container className="p-2 mb-5">
        <div className="p-3 bg-hrun-box hrunboxshadow">
          {" "}
          <div className="py-3 px-1 bg-hrun-box hrunboxshadow">
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
                  Patient Medical Records
                </h5>
                <AllHistoryOverview medicalRecords={patient.medicalRecords} />
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  //defaultActiveKey="active"
                  // className="mb-3 border-bottom border-bottom-1 border-2"
                  variant="underline"
                  fill
                >
                  {/* <Tab eventKey="active" title="History and Examinations">
                    {key === "active" && (
                      <AllHistoryOverview
                        medicalRecords={patient.medicalRecords}
                      />
                    )}
                  </Tab> */}
                  {/* <Tab eventKey="vital" title="Vitals">
                    {key === "vital" && <div>vital</div>}
                  </Tab>

                  <Tab eventKey="lab" title="Laboratory">
                    {key === "lab" && (
                      <AllLaboratoryOverview laboratorys={data.laboverview} />
                    )}
                  </Tab>
                  <Tab eventKey="image" title="Imaging">
                    {key === "image" && (
                      <AllImagingStudiesOverview
                        imagings={data.imagingoverview}
                      />
                    )}
                  </Tab>
                  <Tab eventKey="family" title="Family History">
                    {key === "family" && <div>family History</div>}
                  </Tab>
                  <Tab eventKey="social" title="Social History">
                    {key === "social" && <div>Social History</div>}
                  </Tab> */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatientDetails;
