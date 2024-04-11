import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import LabServiceList from "./LabServiceList";
import ImagingServiceList from "./ImagingServiceList";
import { useNavigate } from "react-router-dom";
import MedicineList from "./MedicineList";
import { useGetUnits } from "../hooks/useGetUnits";

const ClinicServiceList = () => {
  const navigate = useNavigate();
  useGetUnits();
  return (
    <div className="">
      <Container className="">
        <Tabs
          defaultActiveKey="Lab_Pricing"
          variant="underline"
          className="border-bottom border-1"
          id="controlled-tab-example"
        >
          <Tab eventKey="Lab_Pricing" title="Lab Pricing">
            <hr className="mt-0" />
            <LabServiceList />
          </Tab>
          <Tab eventKey="Image" title="Image Pricing">
            <ImagingServiceList />
          </Tab>
          {/*  <Tab eventKey="Addservice" title="medicines">
            <MedicineList />
          </Tab> */}
        </Tabs>
      </Container>
    </div>
  );
};

export default ClinicServiceList;
