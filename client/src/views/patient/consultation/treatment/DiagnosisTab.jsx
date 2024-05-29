import React, { useMemo } from "react";

import { useGetDiagnosis } from "../../hooks/consultationHooks/useGetDiagnosis";
import { useLocation } from "react-router-dom";
import DiagnosisTable from "../diagnosis/DiagnosisTable";
const DiagnosisTab = () => {
  const { state } = useLocation();

  const { data } = useGetDiagnosis(state.medicalRecord_id);
  const diagnosis = useMemo(() => data || [], [data]);
  // console.log(diagnosis);
  return (
    <React.Fragment>
      <DiagnosisTable diagnosis={diagnosis} />
    </React.Fragment>
  );
};

export default DiagnosisTab;
