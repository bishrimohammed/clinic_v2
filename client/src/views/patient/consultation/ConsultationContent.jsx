import React, { Fragment, Suspense, useRef, useState } from "react";
import { Button, Spinner, Tab, Tabs } from "react-bootstrap";
// import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
const ChiefComplaint = React.lazy(() => import("./ChiefComplaint"));
const PhysicalExaminationTab = React.lazy(() =>
  import("./PhysicalExaminationTab")
);
const TreatmentTab = React.lazy(() => import("./TreatmentTab"));
const PlanTab = React.lazy(() => import("./PlanTab"));
// import InvestigationTab from "./InvestigationTab";
import { LuLock } from "react-icons/lu";
import { useSelector } from "react-redux";
import CancelCunsultaionButton from "./CancelCunsultaionButton";
import ConsultationBackButton from "./ConsultationBackButton";
const LabResultTab = React.lazy(() => import("./LabResultTab"));
import { useConsultationSaveForLater } from "../hooks/consultationHooks/useConsultationSaveForLater";
const HistoryTab = React.lazy(() => import("./HistoryTab"));
import { useGetPatient } from "../hooks/patientHooks/useGetPatient";
import PatientGeneralInforamtion from "../patient Detail/PatientGeneralInforamtion";
import { useGetPatientVisitById } from "../../patient visit/hooks/useGetPatientVisitById";
const ProcedureTab = React.lazy(() => import("./ProcedureTab"));
import FinishConsultationBtn from "./FinishConsultationBtn";
const MedicalRecordDocumentTab = React.lazy(() =>
  import("./MedicalRecordDocumentTab")
);
// import LabResultTab from "./LabResultTab";
// import { ConsultationBackButton } from "./ConsultationBackButton";
const ConsultationContent = ({ changeVisibleContent }) => {
  // const navigate = useNavigate();
  const [key, setKey] = React.useState("History");

  const { mutateAsync, isPending } = useConsultationSaveForLater();
  const examTabLocked = useSelector((state) => state.consultation.examLocked);
  const treatmentTabLocked = useSelector(
    (state) => state.consultation.treatmentLocked
  );
  const planTabLocked = useSelector((state) => state.consultation.planLocked);
  // const disabledFinishButton = useSelector(
  //   (state) => state.consultation.finishButtonDisabled
  // );

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
  console.log(visit);

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
      {/* {visit?.isAdmitted ? (
        <div className="d-flex justify-content-end mt-2">
          <button
            onClick={changeVisibleContentHandler}
            className="btn btn-sm btn-primary"
          >
            View Progress Note Page
          </button>
        </div>
      ) : null} */}
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
        // defaultActiveKey="History"
        // id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        variant="underline"
        justify
        onSelect={(k) => setKey(k)}
        activeKey={key}
      >
        <Tab
          eventKey="History"
          title={
            <span className="d-flex justify-content-center align-items-center">
              History
            </span>
          }
        >
          <Suspense fallback={<Spinner color="primary" />}>
            {key === "History" && <HistoryTab />}
          </Suspense>
        </Tab>
        <Tab
          eventKey="Symptoms"
          title={
            <span className="d-flex justify-content-center align-items-center">
              Symptoms
            </span>
          }
        >
          <Suspense fallback={<Spinner color="primary" />}>
            {" "}
            <ChiefComplaint ref={chiefComplaintRef} />
          </Suspense>
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
          <Suspense fallback={<Spinner color="primary" />}>
            {" "}
            <PhysicalExaminationTab ref={ExaminationRef} />
          </Suspense>
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
          <Suspense fallback={<Spinner color="primary" />}>
            {key === "LabResultTab" && <LabResultTab />}
          </Suspense>
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
          <Suspense fallback={<Spinner color="primary" />}>
            {" "}
            <TreatmentTab />
          </Suspense>
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
          <Suspense fallback={<Spinner color="primary" />}>
            {" "}
            <PlanTab ref={PlanRefs} />
          </Suspense>
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
          <Suspense fallback={<Spinner color="primary" />}>
            {" "}
            <ProcedureTab ref={PlanRefs} />
          </Suspense>
        </Tab>
        {visit?.isAdmitted && (
          <Tab
            eventKey="MedicalRecordDocument"
            title={
              <span className="d-flex justify-content-center align-items-center">
                Documents
                {/* {planTabLocked && <LuLock className="ms-1" />} */}
              </span>
            }
            // disabled={planTabLocked}
          >
            <Suspense fallback={<Spinner color="primary" />}>
              {" "}
              {key === "MedicalRecordDocument" && <MedicalRecordDocumentTab />}
            </Suspense>
            {/* <MedicalRecordDocumentTab /> */}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ConsultationContent;
