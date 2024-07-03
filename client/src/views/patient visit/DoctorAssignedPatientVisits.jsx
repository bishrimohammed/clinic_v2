import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DoctorAssignedUpcomingVisitTable from "./visit doctor/DoctorAssignedUpcomingVisitTable";
import DoctorAssignedPreviousVisitTable from "./visit doctor/DoctorAssignedPreviousVisitTable";

const DoctorAssignedPatientVisits = () => {
  return (
    <React.Fragment>
      <Tabs
        id="controlled-tab-example"
        // activeKey={key}
        defaultActiveKey="Active Visits"
        // onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Active Visits" title="Active Visits">
          {/* <UpcomingPatientVisitTable /> */}
          <DoctorAssignedUpcomingVisitTable />
        </Tab>
        <Tab eventKey="previous visit" title="All Visits">
          <DoctorAssignedPreviousVisitTable />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default DoctorAssignedPatientVisits;
