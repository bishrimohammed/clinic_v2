import React, { Fragment, useRef, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ChiefComplaint from "./ChiefComplaint";
import PhysicalExaminationTab from "./PhysicalExaminationTab";
import TreatmentTab from "./TreatmentTab";
import PlanTab from "./PlanTab";
import InvestigationTab from "./InvestigationTab";
import { LuLock } from "react-icons/lu";
import { useSelector } from "react-redux";
import CancelCunsultaionButton from "./CancelCunsultaionButton";
import ConsultationBackButton from "./ConsultationBackButton";
// import { ConsultationBackButton } from "./ConsultationBackButton";
const ConsultationContent = ({ changeVisibleContent }) => {
  const navigate = useNavigate();
  const examTabLocked = useSelector((state) => state.consultation.examLocked);
  const treatmentTabLocked = useSelector(
    (state) => state.consultation.treatmentLocked
  );
  const planTabLocked = useSelector((state) => state.consultation.planLocked);
  const disabledFinishButton = useSelector(
    (state) => state.consultation.finishButtonDisabled
  );

  // console.log(disabledFinishButton);
  // const [childData, setChildData] = useState([]);
  const chiefComplaintRef = useRef(null);
  const ExaminationRef = useRef(null);
  const PlanRefs = useRef();
  const { state } = useLocation();
  // console.log(state);
  const handleSaveForLater = () => {
    const chiefComplaintData = chiefComplaintRef.current.getSaveForLaterData();
    const ExaminationData = ExaminationRef.current.getSaveForLaterData();
    const PlanData = PlanRefs.current.getSaveForLaterData();

    // console.log(chiefComplaintData);
    // console.log(ExaminationData);
    // console.log(PlanData);
  };
  // const resetHandler = () => {
  //   chiefComplaintRef.current.resetData();
  //   ExaminationRef.current.resetData();
  //   PlanRefs.current.resetData();
  //   // setChildData([]);
  // };

  const changeVisibleContentHandler = () => {
    changeVisibleContent("ProgressNotePage");
  };
  return (
    <div>
      <div className="d-flex mt-2 justify-content-between gap-2 border-bottom pb-2 top-buttons">
        <div className=" p-2  d-flex gap-3 align-items-center">
          <ConsultationBackButton />
          <h5 className="mb-0">Perform Consultation</h5>
        </div>
        <div className=" d-flex gap-2">
          <CancelCunsultaionButton medicalRecordId={state.medicalRecord_id} />
          <Button
            // disabled={isPending}
            onClick={handleSaveForLater}
            variant="warning"
            className="btn-sm text-white"
            // className="text-white"
          >
            Save for Later
          </Button>
          <Button
            form="traigeForm"
            className="btn-sm"
            // formTarget="traigeForm"
            type="submit"
            variant="success"
            disabled={disabledFinishButton}
          >
            {/* {isPending && <Spinner size="sm" animation="border" />} */}
            Finish
          </Button>
        </div>
      </div>
      {state.patient.patient_type === "inpatient" ? (
        <div className="d-flex justify-content-end mt-2">
          <button
            onClick={changeVisibleContentHandler}
            className="btn btn-sm btn-primary"
          >
            View Progress Note Page
          </button>
        </div>
      ) : null}
      <Tabs
        defaultActiveKey="Symptoms"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        variant="underline"
        justify
      >
        <Tab
          eventKey="Symptoms"
          title={<span className="d-flex align-items-center">Symptoms</span>}
        >
          <ChiefComplaint ref={chiefComplaintRef} />
        </Tab>
        <Tab
          eventKey="Examination"
          title={
            <span className="d-flex align-items-center">
              Examination {examTabLocked && <LuLock className="ms-1" />}
            </span>
          }
          disabled={examTabLocked}
        >
          <PhysicalExaminationTab ref={ExaminationRef} />
        </Tab>{" "}
        {/* <Tab
          eventKey="InvestigationTab"
          title={
            <span className="d-flex align-items-center">
              Investigation <LuLock />
            </span>
          }
          disabled={treatmentTabLocked}
        >
          <InvestigationTab />
        </Tab> */}
        <Tab
          eventKey="Treatment"
          title={
            <span className="d-flex align-items-center">
              Treatment
              {treatmentTabLocked && <LuLock className="ms-1" />}
            </span>
          }
          disabled={treatmentTabLocked}
        >
          <TreatmentTab />
        </Tab>
        <Tab
          eventKey="Plan"
          title={
            <span className="d-flex align-items-center">
              Plan
              {planTabLocked && <LuLock className="ms-1" />}
            </span>
          }
          disabled={planTabLocked}
        >
          <PlanTab ref={PlanRefs} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ConsultationContent;
