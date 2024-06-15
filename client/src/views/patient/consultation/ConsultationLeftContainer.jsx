// import React, { useRef, useState } from "react";
// import { Button, Tab, Tabs } from "react-bootstrap";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import ChiefComplaint from "./ChiefComplaint";
// import PhysicalExaminationTab from "./PhysicalExaminationTab";
// import TreatmentTab from "./TreatmentTab";
// import PlanTab from "./PlanTab";
// import InvestigationTab from "./InvestigationTab";

import { useState } from "react";
import ProgressNotePage from "../progress note/ProgressNotePage";
import ConsultationContent from "./ConsultationContent";

const ConsultationLeftContainer = () => {
  const [visibleContent, setVisibleContent] = useState("consultation");
  const changeVisibleContent = (content) => {
    console.log(content);
    setVisibleContent(content);
  };
  // const navigate = useNavigate();
  // const [childData, setChildData] = useState([]);
  // const chiefComplaintRef = useRef(null);
  // const ExaminationRef = useRef(null);
  // const PlanRefs = useRef();

  // const handleSaveForLater = () => {
  //   const chiefComplaintData = chiefComplaintRef.current.getSaveForLaterData();
  //   const ExaminationData = ExaminationRef.current.getSaveForLaterData();
  //   const PlanData = PlanRefs.current.getSaveForLaterData();

  //   console.log(chiefComplaintData);
  //   console.log(ExaminationData);
  //   console.log(PlanData);
  // };
  // const resetHandler = () => {
  //   chiefComplaintRef.current.resetData();
  //   ExaminationRef.current.resetData();
  //   PlanRefs.current.resetData();
  //   // setChildData([]);
  // };
  return (
    <div>
      {visibleContent === "consultation" ? (
        <ConsultationContent changeVisibleContent={changeVisibleContent} />
      ) : (
        <ProgressNotePage changeVisibleContent={changeVisibleContent} />
      )}
    </div>
  );
};

export default ConsultationLeftContainer;
