import React from "react";
import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { OrderedLabInvestigationTable } from "./plan/OrderedLabInvestigationTable";
import { useLocation } from "react-router-dom";
import OrderExternalLabInvestigation from "./plan/OrderExternalLabInvestigation";

const InvestigationTab = () => {
  const { state } = useLocation();
  const { data: lab_investigation, error } = useOrdered_Lab_Investigations(
    state.medicalRecord_id
  );
  return (
    <div>
      <OrderedLabInvestigationTable
        investigations={lab_investigation?.orderedTest}
      />
      {/* <OrderExternalLabInvestigation /> */}
    </div>
  );
};

export default InvestigationTab;
