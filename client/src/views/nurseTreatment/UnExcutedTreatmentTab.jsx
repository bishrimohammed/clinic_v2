import React, { useMemo, useState } from "react";

// import { useGetActiveTreatment } from "./hooks/useGetActiveTreatment";
import { useGetExcutedMedication } from "./hooks/useGetExcutedMedication";
import { useQueryClient } from "@tanstack/react-query";
import { useExcuteAllMedicines } from "./hooks/useExcuteAllMedicines";
import { useExcuteMedicine } from "./hooks/useExcuteMedicine";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { useGetAllPrescribedMedicine } from "./hooks/useGetAllPrescribedMedicine";
import { toast } from "react-toastify";

const UnExcutedTreatmentTab = ({ treatmentId }) => {
  // const { patient, prescribedMedicines, medicalRecord } = treatment;
  const { data: excutedTreatment } = useGetExcutedMedication(treatmentId);
  const [showExcuteAllModal, setShowExcuteAllModal] = useState(false);
  const [showExcuteModal, setShowExcuteModal] = useState({
    show: false,
    medicationId: null,
  });
  const { data } = useGetAllPrescribedMedicine(treatmentId);
  const mutationExcuteAll = useExcuteAllMedicines();
  const mutationExcute = useExcuteMedicine();
  const queryClient = useQueryClient();
  // console.log(data);
  const handleExcuteAll = () => {
    mutationExcuteAll
      .mutateAsync(treatment.id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("All medicines executed successfully");
          handleClose();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleExcute = (medicationId) => {
    mutationExcute
      .mutateAsync(medicationId)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Excuted successfully");
          setShowExcuteModal({ medicationId: null, show: false });
          // console.log(data.length);
          if (data.length === 1) {
            queryClient.invalidateQueries({
              queryKey: ["activeTreatments"],
            });
            handleClose();
          }
        }
      })
      .catch((err) => {
        console.error(err);
        // console.error();
      });
  };
  return (
    <div>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Route</th>
            <th>When</th>
            <th>Prescriber</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((medicine, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {medicine.is_internal
                  ? medicine.medicine?.service_name
                  : medicine.drug_name}
              </td>
              <td>{medicine.dosage}</td>
              <td>{medicine.frequency}</td>
              <td>{medicine.route}</td>
              <td>{medicine.when}</td>
              <td>
                {medicine.doctor.employee.firstName}{" "}
                {medicine.doctor.employee.middleName}
              </td>
              <td>
                <Button
                  onClick={() => {
                    setShowExcuteModal({
                      show: true,
                      medicationId: medicine.id,
                    });
                  }}
                  disabled={medicine.is_excuted}
                  variant="success"
                  className="btn-sm"
                >
                  Excute
                </Button>
                {/*   <Button variant="danger">Delete</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showExcuteAllModal && (
        <Modal
          show={showExcuteAllModal}
          onHide={() => setShowExcuteAllModal(false)}
          backdrop="static"
          centered
          size="sm"
        >
          {/* <Modal.Header closeButton>
            <Modal.Title>Excute All Medicines</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <p>
              Are you sure you want to excute all medicines for this patient?
            </p>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowExcuteAllModal(false)}
                className="btn-sm"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                // onClick={() => setShowExcuteAllModal(false)}
                onClick={handleExcuteAll}
                className="btn-sm"
                disabled={mutationExcuteAll.isPending}
              >
                {mutationExcuteAll.isPending && <Spinner size="sm" />}
                Excute
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {showExcuteModal.show && (
        <Modal
          show={showExcuteModal.show}
          onHide={() => setShowExcuteModal({ show: false, medicationId: null })}
          backdrop="static"
          centered
          size="sm"
        >
          <Modal.Body>
            <p>Are you sure you want to excute this medicine?</p>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  setShowExcuteModal({ show: false, medicationId: null })
                }
                className="btn-sm"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                // onClick={() => setShowExcuteAllModal(false)}
                className="btn-sm"
                onClick={() => handleExcute(showExcuteModal.medicationId)}
                disabled={mutationExcute.isPending}
              >
                {mutationExcute.isPending && <Spinner size="sm" />}
                Excute
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default UnExcutedTreatmentTab;
