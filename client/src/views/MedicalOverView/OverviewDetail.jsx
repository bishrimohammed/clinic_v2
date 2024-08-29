import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import LabResultTab from "./tabs/LabResultTab";
import SickleaveNoteTab from "./tabs/SickleaveNoteTab";
import ReferralNoteTab from "./tabs/ReferralNoteTab";
import PrescriptionsTab from "./tabs/PrescriptionsTab";
import { differenceInYears } from "date-fns";
import useOrdered_Lab_Investigations from "../patient/History/investigation/hooks/useOrdered_Lab_Investigations";

const OverviewDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    data: investigations,
    isRefetching,
    refetch,
  } = useOrdered_Lab_Investigations(state.id);

  console.log(investigations);
  return (
    <div>
      <div className=" p-2  d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        {/* <h5 className="mb-0">Back</h5> */}
        <h5 className="mb-0">Patient Medical Record Overview</h5>
      </div>
      {/* <hr /> */}
      <div className="d-flex gap-md-5 gap-4 flex-wrap  py-3 px-1 mt-2 border">
        <h6 className="mb-0">
          Patient Name: {state.patient.firstName} {state.patient.middleName}
        </h6>
        <h6 className="mb-0 ">ID: {state.patient.card_number}</h6>
        <h6 className="mb-0 ">
          Age: {differenceInYears(new Date(), state.patient.birth_date)} years
          old
        </h6>
        <h6 className="mb-0 ">Gender: {state.patient.gender}</h6>
        <h6 className="mb-0 ">Phone: {state.patient.phone}</h6>
      </div>

      <Tabs
        defaultActiveKey="Lab result"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 border-bottom"
        variant="underline"
        justify
      >
        <Tab eventKey="Lab result" title="Lab Result">
          <LabResultTab
            patient={state.patient}
            investigations={investigations?.orderedTest}
            isRefetching={isRefetching}
            refetch={refetch}
          />
          {/* <ChiefComplaint /> */}
        </Tab>
        <Tab
          eventKey="Sickleave"
          title="Sick leave Note"
          //   disabled={examTabLocked}
        >
          {/* <PhysicalExaminationTab ref={ExaminationRef} /> */}
          <SickleaveNoteTab patient={state.patient} />
        </Tab>{" "}
        <Tab
          eventKey="Referral Note"
          title="Referral Note"
          //   disabled={treatmentTabLocked}
        >
          {/* <TreatmentTab /> */}
          <ReferralNoteTab patient={state.patient} />
        </Tab>
        <Tab
          eventKey="Prescriptions"
          title="Prescriptions"
          //   disabled={planTabLocked}
        >
          {/* <PlanTab ref={PlanRefs} /> */}
          <PrescriptionsTab patient={state.patient} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default OverviewDetail;
