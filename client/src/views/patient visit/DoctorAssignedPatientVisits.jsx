import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DoctorAssignedUpcomingVisitTable from "./visit doctor/DoctorAssignedUpcomingVisitTable";
import DoctorAssignedPreviousVisitTable from "./visit doctor/DoctorAssignedPreviousVisitTable";
import { useSearchParams } from "react-router-dom";

const DoctorAssignedPatientVisits = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = React.useState("active_visits");

  // console.log(activeTab);
  React.useEffect(() => {
    // console.log(searchParams.get("tab"));
    setSearchParams((prev) => {
      if (searchParams.get("tab") === activeTab) {
        return prev;
      } else {
        prev.set("tab", activeTab);
        return prev;
      }
    });
  }, [activeTab]);
  return (
    <React.Fragment>
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTab}
        // defaultActiveKey="Active Visits"
        onSelect={(k) => {
          // console.log(k);
          // console.log(activeTab);
          k !== activeTab ? setActiveTab(k) : null;
        }}
        className="mb-3"
      >
        <Tab eventKey="active_visits" title="Active Visits">
          {/* <UpcomingPatientVisitTable /> */}
          {activeTab === "active_visits" && (
            <DoctorAssignedUpcomingVisitTable />
          )}
          {/* <DoctorAssignedUpcomingVisitTable /> */}
        </Tab>
        <Tab eventKey="all_visits" title="All Visits">
          {activeTab === "all_visits" && <DoctorAssignedPreviousVisitTable />}
          {/* <DoctorAssignedPreviousVisitTable /> */}
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default DoctorAssignedPatientVisits;
