import React, { useMemo, useState } from "react";
import PatientVisitTable from "./PatientVisitTable";
import { Tab, Tabs } from "react-bootstrap";
import UpcomingPatientVisitTable from "./UpcomingPatientVisitTable";
import { useSearchParams } from "react-router-dom";

const PatientVisitList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("active_visits");

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
    <div>
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
          {activeTab === "active_visits" && <UpcomingPatientVisitTable />}
          {/* <UpcomingPatientVisitTable /> */}
        </Tab>
        <Tab eventKey="all_visits" title="All Visits">
          {activeTab === "all_visits" && <PatientVisitTable />}
          {/* <PatientVisitTable /> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default PatientVisitList;
