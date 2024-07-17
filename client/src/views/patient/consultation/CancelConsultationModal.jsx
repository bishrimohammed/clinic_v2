import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useCancelMedicalRecord } from "../hooks/consultationHooks/useCancelMedicalRecord";

const CancelConsultationModal = ({ show, handleClose, medicalRecordId }) => {
  const { mutateAsync, isPending } = useCancelMedicalRecord();
  const cancleHandler = () => {
    mutateAsync(medicalRecordId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        handleClose();
      }
    });
  };
  return (
    <Modal
      size="sm"
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Body>
        Are you sure you want to cancel Medical record
        <div className="d-flex justify-content-end gap-2 mt-2">
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            // size="sm"
            variant="danger"
            onClick={() => {
              cancleHandler();
            }}
            disabled={isPending}
          >
            {isPending && <Spinner size="sm" />}
            Yes
          </Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default CancelConsultationModal;
