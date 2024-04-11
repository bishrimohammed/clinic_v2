import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import { useParams } from "react-router-dom";

//import ExternalPrescription from "./ExternalPrescription";
// import useGetHistoryPrescription from "../../hooks/usePrescription";

import useMedicalHistory from "../../hooks/useMedicalhistory";
const InternalPrescription = React.lazy(() =>
  import("../medication/InternalPrescription")
);
const ExternalPrescription = React.lazy(() =>
  import("../medication/ExternalPrescription")
);
const PrescribedList = React.lazy(() => import("../medication/PrescribedList"));

const Addprescription = () => {
  const { historyId } = useParams();
  const { data: history } = useMedicalHistory(historyId);
  const [key, setKey] = useState("Internal Prescription");

  return (
    <div className="minHeight100">
      <Tabs
        id="controlled-tab-example"
        className=" border-bottom border-bottom-1 border-2"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        fill
        variant="underline"
        //defaultActiveKey="Internal Prescription"
      >
        <Tab eventKey="Internal Prescription" title="Internal Prescription">
          <h5 className="ps-2 mt-md-3 pb-1">prescribe Internal medication</h5>
          {key === "Internal Prescription" && (
            /*  <Addprescriptions history={history} /> */
            <InternalPrescription history={history} />
          )}
        </Tab>
        <Tab eventKey="ExternalPrescription" title="External Prescription">
          <h4 className="ps-2  pb-1">prescribe External medication</h4>

          <ExternalPrescription history={history} />
        </Tab>
        <Tab
          eventKey="prescribedmedication"
          title="prescribed medication for this history"
        >
          <PrescribedList />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Addprescription;
