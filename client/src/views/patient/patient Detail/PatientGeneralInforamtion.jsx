import React from "react";
import PatientAllergies from "./Allergy/PatientAllergies";
// import PatientCurrentMedication from "./current medication/PatientCurrentMedication";
// import PatientPastMedicalHistory from "./pastMedicalHistory/PatientPastMedicalHistory";
import PatientFamilyHistory from "./family history/PatientFamilyHistory";
import PatientSocialHistory from "./social history/PatientSocialHistory";
import { differenceInYears } from "date-fns";
import ConditionsAndMedications from "./pastMedicalHistory/ConditionsAndMedications";
import HivContainer from "./HIV/HivContainer";
import Disability from "./disability/Disability";
const PatientGeneralInforamtion = ({ patient, medicalRecordId }) => {
  // console.log(patient);
  return (
    <React.Fragment>
      <p className="mb-1 small">
        Name: {patient?.firstName} {patient?.middleName} {patient?.lastName}{" "}
      </p>
      <p className="mb-1 small">ID: {patient?.card_number}</p>
      <p className="mb-1 small">
        Age: {differenceInYears(new Date(), patient?.birth_date)} years
      </p>
      <p className="mb-1 small">Sex: {patient?.gender}</p>

      <PatientAllergies
        // allergies={patient?.allergies}
        patientId={patient?.id}
      />
      {/* <PatientCurrentMedication /> */}

      {/* <PatientPastMedicalHistory
        patientId={patient?.id}
        pastMedicalHistories={patient?.pastMedicalHistories}
      /> */}
      <ConditionsAndMedications
        patientId={patient?.id}
        pastMedicalHistories={patient?.pastMedicalHistories}
        medicalRecordId={medicalRecordId}
      />

      <PatientFamilyHistory
        familyHistories={patient?.familyHistories}
        patientId={patient?.id}
      />

      <PatientSocialHistory
        socialHistories={patient?.socialHistories}
        patientId={patient?.id}
      />
      <HivContainer patient={patient} />
      <Disability patient={patient} />
    </React.Fragment>
  );
};

export default PatientGeneralInforamtion;
