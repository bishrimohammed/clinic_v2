import React from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ChiefComplaint from "./ChiefComplaint";
import PhysicalExaminationTab from "./PhysicalExaminationTab";
import TreatmentTab from "./TreatmentTab";
import PlanTab from "./PlanTab";

const ConsultationLeftContainer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex mt-2 justify-content-between gap-2 top-buttons">
        <div className=" p-2  d-flex gap-3 align-items-center">
          <IoMdArrowRoundBack
            className="cursorpointer"
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h5 className="mb-0">Back</h5>
        </div>
        <div className=" d-flex gap-2">
          <Button
            variant="danger"
            // disabled={
            //   !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
            //   isPending
            // }
            onClick={() => setShowCancelTriageModal(true)}
          >
            Cancel
          </Button>
          <Button
            // disabled={isPending}
            // onClick={saveForLaterHandler}
            variant="warning"
          >
            Save for Later
          </Button>
          <Button
            form="traigeForm"
            // formTarget="traigeForm"
            type="submit"
            variant="success"
            // disabled={isPending}
          >
            {/* {isPending && <Spinner size="sm" animation="border" />} */}
            Finish
          </Button>
        </div>
      </div>
      {/* <hr /> */}
      <Tabs
        defaultActiveKey="Symptoms"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        variant="underline"
        fill
      >
        <Tab eventKey="Symptoms" title="Symptoms">
          <ChiefComplaint />
        </Tab>
        <Tab eventKey="Examination" title="Examination">
          <PhysicalExaminationTab />
        </Tab>
        <Tab eventKey="Treatment" title="Treatment">
          <TreatmentTab />
        </Tab>
        <Tab eventKey="Plan" title="Plan">
          <PlanTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ConsultationLeftContainer;
