import React, { useState } from "react";
import { Table } from "react-bootstrap";
import AddInternalMedicationModal from "../medication/AddInternalMedicationModal";
import { FaPlusCircle } from "react-icons/fa";
import { useGet_Internal_MedicalRecordPrescription } from "../../hooks/consultationHooks/medication/useGet_Internal_MedicalRecordPrescription";
import { useLocation } from "react-router-dom";

const InternalMedicineTable = () => {
  const [showAddInternalMedicationModal, setShowAddInternalMedicationModal] =
    useState(false);
  const { state } = useLocation();
  const { data } = useGet_Internal_MedicalRecordPrescription(
    state.medicalRecord_id
  );
  // console.log(data);
  return (
    <>
      <h5 className="d-flex gap-2 mb-3">
        <span className="border-bottom border-dark py-2">
          Internal Medicine
        </span>
        <button
          onClick={() => setShowAddInternalMedicationModal(true)}
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
            <th>Start Date</th>
            <th>Prescriber</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((p, index) => {
            return (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.medicine?.service_name}</td>
                <td>{p.dosage}</td>
                <td>{p.frequency}</td>
                <td>{new Date(p.start_date).toISOString().substring(0, 10)}</td>
                <td>
                  {p.doctor?.employee?.firstName}{" "}
                  {p.doctor?.employee?.middleName}{" "}
                  {p.doctor?.employee?.lastName}{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showAddInternalMedicationModal && (
        <AddInternalMedicationModal
          show={showAddInternalMedicationModal}
          handleClose={() => setShowAddInternalMedicationModal(false)}
        />
      )}
    </>
  );
};

export default InternalMedicineTable;
