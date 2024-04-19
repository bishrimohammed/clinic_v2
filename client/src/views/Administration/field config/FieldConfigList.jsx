import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import VitalSignConfig from "./VitalSignConfig";

const FieldConfigList = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="Vitalsigns"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Vitalsigns" title="Vital signs">
          <VitalSignConfig />
        </Tab>
        <Tab eventKey="Physicalexaminations" title="Physical examinations">
          Physical examinations
        </Tab>
        <Tab eventKey="Visittypes" title="Visit types">
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
};

export default FieldConfigList;
