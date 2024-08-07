import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useAdmitPatient } from "../../../patient visit/hooks/useAdmitPatient";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetPatientVisitById } from "../../../patient visit/hooks/useGetPatientVisitById";

const AdmitButton = () => {
  const { state } = useLocation();
  const { data: visit } = useGetPatientVisitById(state.id);
  console.log(visit);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { mutateAsync, isPending } = useAdmitPatient();
  return (
    <>
      <button
        onClick={() => {
          setShowConfirmModal(true);
        }}
        className="btn btn-primary btn-sm"
        disabled={visit?.isAdmitted}
      >
        Admit
      </button>
      <Modal
        size="sm"
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
        }}
        centered
        backdrop="static"
      >
        <Modal.Body>Are you sure you want to admit this patient?</Modal.Body>
        <div className="d-flex justify-content-end gap-3 p-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setShowConfirmModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              mutateAsync(state.medicalRecord_id)
                .then((res) => {
                  setShowConfirmModal(false);
                  // toast.success("Patient is Admitted Successfully");
                  // navigate to next page
                  // alert("Patient admitted successfully!");
                  // or redirect to patient visit page
                })
                .catch((err) => {
                  toast.error(err.response.data.message);
                  console.error(err);
                });
              // trigger admit patient function
            }}
            disabled={isPending}
          >
            {isPending && <Spinner size="sm" />}
            Admit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AdmitButton;
