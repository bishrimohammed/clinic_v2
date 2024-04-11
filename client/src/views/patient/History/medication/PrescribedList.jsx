/* eslint-disable react/prop-types */
import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import ExternalList from "./prescribedlist/ExternalList";
import InternalPresList from "./prescribedlist/InternalPresList";
import { useGetClinicInformation } from "../../../Administration/clinic setting/hooks/useGetClinicInformation";
// import { useGetClinicInformation } from "../../../hooks/useGetClinicInformation";

const PrescribedList = () => {
  useGetClinicInformation();
  return (
    <div className=" p-2">
      {/*  <h3>prescribed_medication</h3> */}
      <Tabs
        id="controlled-tab-example1"
        className="border-bottom border-bottom-1 border-2"
        defaultActiveKey="Internal"
        variant="underline"
        key="pres"
      >
        <Tab eventKey="Internal" title="Internal">
          <hr />
          <InternalPresList />
        </Tab>
        <Tab eventKey="External" title="External">
          <hr />
          <ExternalList />
        </Tab>
      </Tabs>
    </div>
  );
};
const PrescribedListMemoized = React.memo(PrescribedList);
export default PrescribedListMemoized;
