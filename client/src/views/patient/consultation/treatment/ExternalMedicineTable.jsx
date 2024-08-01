import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import AddExternalPrescriptionModal from "../medication/AddExternalPrescriptionModal";
import { useGet_External_MedicalRecordPrescription } from "../../hooks/consultationHooks/medication/useGet_External_MedicalRecordPrescription";
import { useLocation } from "react-router-dom";

const ExternalMedicineTable = () => {
  const [showAddExternalMedicationModal, setShowAddExternalMedicationModal] =
    useState(false);
  const { state } = useLocation();
  const { data } = useGet_External_MedicalRecordPrescription(
    state.medicalRecord_id
  );
  // console.log(data);
  return (
    <>
      <h5 className="d-flex gap-2 mb-3">
        <span className="border-bottom border-dark py-2">
          External Medicine
        </span>
        <button
          onClick={() => setShowAddExternalMedicationModal(true)}
          className="border-0  bg-transparent "
        >
          <FaPlusCircle size={18} className="text-primary " />
        </button>
      </h5>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Drug Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            {/* <th>Duration</th> */}
            <th>Route</th>
            <th>When</th>
            {/* <th>Start Date</th> */}
            <th>Prescriber</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p, index) => (
            <tr key={p.drug_name + index}>
              <td>{index + 1}</td>
              <td>{p.drug_name}</td>
              {/* <td>{p.dosage}</td>
              <td>{p.frequency}</td>
              <td>{new Date(p.start_date).toISOString().substring(0, 10)}</td> */}
              <td>
                {" "}
                {p.dosage ? p.dosage : <span className="text-danger">__</span>}
              </td>
              <td>
                {p.frequency ? (
                  p.frequency
                ) : (
                  <span className="text-danger">__</span>
                )}
              </td>
              {/* <td>{p.duration}</td> */}
              <td>
                {" "}
                {p.route ? p.route : <span className="text-danger">__</span>}
              </td>
              <td>
                {" "}
                {p.when ? p.when : <span className="text-danger">__</span>}
              </td>
              <td>
                {p.doctor?.employee?.firstName} {p.doctor?.employee?.middleName}{" "}
                {p.doctor?.employee?.lastName}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showAddExternalMedicationModal && (
        <AddExternalPrescriptionModal
          show={showAddExternalMedicationModal}
          handleClose={() => setShowAddExternalMedicationModal(false)}
        />
      )}
    </>
  );
};

export default ExternalMedicineTable;
