import { useState } from "react";
import ProgressNotePage from "../progress note/ProgressNotePage";
import ConsultationContent from "./ConsultationContent";

const ConsultationLeftContainer = () => {
  const [visibleContent, setVisibleContent] = useState("consultation");
  const changeVisibleContent = (content) => {
    // console.log(content);
    setVisibleContent(content);
  };

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
