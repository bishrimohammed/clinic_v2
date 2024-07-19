import React from "react";
import { Tab, Tabs } from "react-bootstrap";

const HistoryTab = () => {
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
          <h2>Home</h2>
        </Tab>
        <Tab eventKey="clinic Data" title="clinic Data">
          <h2>clinic Data</h2>
        </Tab>
        <Tab eventKey="Prescriptions" title="Prescriptions">
          <h2>Prescriptions</h2>
        </Tab>
        <Tab eventKey="Certificates" title="Certificates">
          <h2>Certificates</h2>
        </Tab>
        <Tab eventKey="Lab & Imaging" title="Lab & Imaging">
          <h2>Lab & Imaging</h2>
        </Tab>
        <Tab eventKey="Procuders" title="Procuders">
          <h2>Procuders</h2>
        </Tab>
      </Tabs>
    </div>
  );
};

export default HistoryTab;
