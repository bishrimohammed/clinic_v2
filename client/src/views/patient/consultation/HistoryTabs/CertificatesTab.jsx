import React from "react";
import { useGetPatientMedicalCertificates } from "../../hooks/consultationHooks/PatientOverViewHooks/useGetPatientMedicalCertificates";
import { useGetPatientReferralNotes } from "../../hooks/consultationHooks/PatientOverViewHooks/useGetPatientReferralNotes";

const CertificatesTab = ({ patientId }) => {
  const { data: medicalCertificates } = useGetPatientMedicalCertificates({
    patientId,
  });
  console.log(medicalCertificates);
  const { data: referralNotes } = useGetPatientReferralNotes({ patientId });
  console.log(referralNotes);
  return <div>CertificatesTab</div>;
};

export default CertificatesTab;
