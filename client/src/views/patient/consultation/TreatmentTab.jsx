import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DiagnosisTab from "./treatment/DiagnosisTab";
import MedicineTab from "./treatment/MedicineTab";

const TreatmentTab = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="Diagnosis"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        // variant="underline"
        // fill
      >
        <Tab eventKey="Diagnosis" title="Diagnosis">
          <DiagnosisTab />
        </Tab>
        <Tab eventKey="Medicine" title="Medicine">
          <MedicineTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TreatmentTab;
