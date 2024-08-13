import React from "react";
import { useLocation } from "react-router-dom";
import { useGetExternalServiceLabtests } from "./hooks/useGetExternalServiceLabtests";
import LabResultTab from "../MedicalOverView/tabs/LabResultTab";

const ViewLabExternalServiceDetail = () => {
  const { state } = useLocation();
  // console.log(state);
  const {
    data: investigations,
    isRefetching,
    refetch,
  } = useGetExternalServiceLabtests(state.id);
  console.log(investigations);
  return (
    <div>
      <LabResultTab
        patient={{ firstName: state.patient_name }}
        investigations={investigations}
        isRefetching={isRefetching}
        refetch={refetch}
      />
    </div>
  );
};

export default ViewLabExternalServiceDetail;
