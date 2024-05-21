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
        defaultActiveKey="Today Visits"
        // onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Today Visits" title="Today’s Visits">
          {/* <UpcomingPatientVisitTable /> */}
          <DoctorAssignedUpcomingVisitTable />
        </Tab>
        <Tab eventKey="previous visit" title="Previous Visits">
          <DoctorAssignedPreviousVisitTable />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default DoctorAssignedPatientVisits;
