import React from "react";
import { Container, Spinner } from "react-bootstrap";
// import { useGetPatientGeneralInfo } from "../hooks/patientHooks/useGetPatientGeneralInfo";
import { useLocation } from "react-router-dom";
import PatientGeneralInforamtion from "../patient Detail/PatientGeneralInforamtion";
import ConsultationLeftContainer from "./ConsultationLeftContainer";
import { useGetPatient } from "../hooks/patientHooks/useGetPatient";
import { useDispatch } from "react-redux";
import { resetConsultation } from "../../../store/consultationSlice";

const ConsultationPage = () => {
  const { state } = useLocation();
  // console.log(state);
  const { data: patient, isPending } = useGetPatient(state.patient_id);
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(resetConsultation());
    };
  }, []);
  return (
    <Container className="p-2 mb-5">
      <div className="p-3 bg-hrun-box hrunboxshadow">
        <div className="d-flex gap-3">
          <div style={{ flex: 75 }} className="left ">
            <ConsultationLeftContainer />
          </div>
          <div style={{ flex: 25 }} className="right p-2 border">
            {isPending ? (
              <Spinner animation="grow" />
            ) : (
              <PatientGeneralInforamtion patient={patient} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConsultationPage;
