import React, { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
const PINK = "rgba(241, 190, 198, 0.6)";
const BLUE = "rgb(207, 226, 255";

export const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  // console.log(" ContextAwareToggle re ");
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div
      className="p-2 curserpointer"
      style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
};
//function ContextAwareToggle({ children, eventKey, callback })
