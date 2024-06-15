import React, { useRef, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ChiefComplaint from "./ChiefComplaint";
import PhysicalExaminationTab from "./PhysicalExaminationTab";
import TreatmentTab from "./TreatmentTab";
import PlanTab from "./PlanTab";
import InvestigationTab from "./InvestigationTab";

const ConsultationContent = ({ changeVisibleContent }) => {
  const navigate = useNavigate();
  // const [childData, setChildData] = useState([]);
  const chiefComplaintRef = useRef(null);
  const ExaminationRef = useRef(null);
  const PlanRefs = useRef();
  const { state } = useLocation();
  console.log(state);
  const handleSaveForLater = () => {
    const chiefComplaintData = chiefComplaintRef.current.getSaveForLaterData();
    const ExaminationData = ExaminationRef.current.getSaveForLaterData();
    const PlanData = PlanRefs.current.getSaveForLaterData();

    console.log(chiefComplaintData);
    console.log(ExaminationData);
    console.log(PlanData);
  };
  const resetHandler = () => {
    chiefComplaintRef.current.resetData();
    ExaminationRef.current.resetData();
    PlanRefs.current.resetData();
    // setChildData([]);
  };

  const changeVisibleContentHandler = () => {
    changeVisibleContent("ProgressNotePage");
  };
  return (
    <div>
      <div className="d-flex mt-2 justify-content-between gap-2 border-bottom pb-2 top-buttons">
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
            className="btn-sm"
            // disabled={
            //   !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
            //   isPending
            // }
            // onClick={() => setShowCancelTriageModal(true)}
            onClick={resetHandler}
          >
            Cancel
          </Button>
          <Button
            // disabled={isPending}
            onClick={handleSaveForLater}
            variant="warning"
            className="btn-sm"
          >
            Save for Later
          </Button>
          <Button
            form="traigeForm"
            className="btn-sm"
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
      <div className="d-flex justify-content-end mt-2">
        <button
          onClick={changeVisibleContentHandler}
          className="btn btn-sm btn-primary"
        >
          View Progress Note Page
        </button>
      </div>
      <Tabs
        defaultActiveKey="Symptoms"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        variant="underline"
        fill
      >
        <Tab eventKey="Symptoms" title="Symptoms">
          <ChiefComplaint ref={chiefComplaintRef} />
        </Tab>
        <Tab eventKey="Examination" title="Examination">
          <PhysicalExaminationTab ref={ExaminationRef} />
        </Tab>{" "}
        <Tab eventKey="InvestigationTab" title="Investigation">
          <InvestigationTab />
        </Tab>
        <Tab eventKey="Treatment" title="Treatment">
          <TreatmentTab />
        </Tab>
        <Tab eventKey="Plan" title="Plan">
          <PlanTab ref={PlanRefs} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ConsultationContent;
