import React, { Fragment, useRef, useState } from "react";
import { Button, Spinner, Tab, Tabs } from "react-bootstrap";
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
import LabResultTab from "./LabResultTab";
import { useConsultationSaveForLater } from "../hooks/consultationHooks/useConsultationSaveForLater";
import HistoryTab from "./HistoryTab";
import { useGetPatient } from "../hooks/patientHooks/useGetPatient";
import PatientGeneralInforamtion from "../patient Detail/PatientGeneralInforamtion";
import { useGetPatientVisitById } from "../../patient visit/hooks/useGetPatientVisitById";
import ProcedureTab from "./ProcedureTab";
import FinishConsultationBtn from "./FinishConsultationBtn";
// import LabResultTab from "./LabResultTab";
// import { ConsultationBackButton } from "./ConsultationBackButton";
const ConsultationContent = ({ changeVisibleContent }) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useConsultationSaveForLater();
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
  const { data: visit } = useGetPatientVisitById(state.id);
  const { data: patient, isPending: patientLoading } = useGetPatient(
    state.patient_id
  );
  // console.log(state);
  const handleSaveForLater = () => {
    const chiefComplaintData = chiefComplaintRef.current.getSaveForLaterData();
    const ExaminationData = ExaminationRef.current.getSaveForLaterData();
    const PlanData = PlanRefs.current.getSaveForLaterData();
    const symptoms = {
      chiefComplaint: chiefComplaintData.chief_complaint,
      HPI: chiefComplaintData.HPI,
    };
    const physicalExamination = ExaminationData.physicalExaminations.some(
      (phy) => phy.value !== ""
    )
      ? ExaminationData.physicalExaminations
      : undefined;
    const examination = {
      physicalExaminations: physicalExamination,
      underpanels: ExaminationData?.indirectlySelectedLabs,
      investigations: ExaminationData?.selectedLabs,
    };
    const PLAN = {
      plan: PlanData.plan,
    };
    mutateAsync({
      formData: { plan: PlanData.plan, examination, symptoms },
      medicalRecordId: state.medicalRecord_id,
    });
    console.log(chiefComplaintData);
    console.log(ExaminationData);
    console.log(PlanData);
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
      <div className="d-flex mt-2 justify-content-between align-items-center gap-2 border-bottom pb-2 top-buttons">
        <div className=" p-2  d-flex gap-3 align-items-center">
          <ConsultationBackButton />
          <h5 className="mb-0 fs-md-1 ">Perform Consultation</h5>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <CancelCunsultaionButton medicalRecordId={state.medicalRecord_id} />
          <Button
            // disabled={isPending}
            onClick={handleSaveForLater}
            variant="warning"
            className="btn-sm text-white text-nowrap"
            // className="text-white"
          >
            {isPending && <Spinner size="sm" />}
            Save for Later
          </Button>
          <FinishConsultationBtn />
        </div>
      </div>
      {visit?.isAdmitted ? (
        <div className="d-flex justify-content-end mt-2">
          <button
            onClick={changeVisibleContentHandler}
            className="btn btn-sm btn-primary"
          >
            View Progress Note Page
          </button>
        </div>
      ) : null}
      <div className="d-md-none d-block mt-2 border ps-1">
        {patientLoading ? (
          <Spinner animation="grow" />
        ) : (
          <PatientGeneralInforamtion
            patient={patient}
            patientId={state?.patient_id}
          />
        )}
      </div>
      <Tabs
        defaultActiveKey="History"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        variant="underline"
        justify
      >
        <Tab
          eventKey="History"
          title={
            <span className="d-flex justify-content-center align-items-center">
              History
            </span>
          }
        >
          <HistoryTab />
        </Tab>
        <Tab
          eventKey="Symptoms"
          title={
            <span className="d-flex justify-content-center align-items-center">
              Symptoms
            </span>
          }
        >
          <ChiefComplaint ref={chiefComplaintRef} />
        </Tab>
        <Tab
          eventKey="Examination"
          title={
            <span className="d-flex justify-content-center align-items-center">
              Examination {examTabLocked && <LuLock className="ms-1" />}
            </span>
          }
          disabled={examTabLocked}
        >
          <PhysicalExaminationTab ref={ExaminationRef} />
        </Tab>{" "}
        <Tab
          eventKey="LabResultTab"
          // title="Lab Result"
          title={
            <span className="d-flex justify-content-center align-items-center text-nowrap">
              Lab Result
            </span>
          }

          // disabled={treatmentTabLocked}
        >
          <LabResultTab />
        </Tab>
        <Tab
          eventKey="Treatment"
          title={
            <span className="d-flex justify-content-center  align-items-center">
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
            <span className="d-flex justify-content-center align-items-center">
              Plan
              {planTabLocked && <LuLock className="ms-1" />}
            </span>
          }
          disabled={planTabLocked}
        >
          <PlanTab ref={PlanRefs} />
        </Tab>
        <Tab
          eventKey="Procedure"
          title={
            <span className="d-flex justify-content-center align-items-center">
              Procedure
              {planTabLocked && <LuLock className="ms-1" />}
            </span>
          }
          disabled={planTabLocked}
        >
          <ProcedureTab ref={PlanRefs} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ConsultationContent;
