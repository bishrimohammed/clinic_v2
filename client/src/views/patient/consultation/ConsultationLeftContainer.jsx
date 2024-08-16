import { useState } from "react";
import ProgressNotePage from "../progress note/ProgressNotePage";
import ConsultationContent from "./ConsultationContent";
import { useLocation } from "react-router-dom";

const ConsultationLeftContainer = () => {
  const { state } = useLocation();
  // console.log(state);
  const [visibleContent, setVisibleContent] = useState(
    state.isAdmitted ? "progressNote" : "consultation"
  );
  const changeVisibleContent = (content) => {
    // console.log(content);
    setVisibleContent(content);
  };

  return (
    <>
      {visibleContent === "consultation" ? (
        <ConsultationContent changeVisibleContent={changeVisibleContent} />
      ) : (
        <ProgressNotePage changeVisibleContent={changeVisibleContent} />
      )}
    </>
  );
};

export default ConsultationLeftContainer;
