import React, { useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Spinner,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { useGetAllPrescribedMedicine } from "./hooks/useGetAllPrescribedMedicine";
import { useExcuteAllMedicines } from "./hooks/useExcuteAllMedicines";
import { useExcuteMedicine } from "./hooks/useExcuteMedicine";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useGetExcutedMedication } from "./hooks/useGetExcutedMedication";
import UnExcutedTreatmentTab from "./UnExcutedTreatmentTab";
import ExcutedTreatementTab from "./ExcutedTreatementTab";

const ViewTreatmentDetailModal = ({ show, handleClose, treatment }) => {
  const { patient, prescribedMedicines, medicalRecord } = treatment;
  const { data: excutedTreatment } = useGetExcutedMedication(treatment.id);
  const [showExcuteAllModal, setShowExcuteAllModal] = useState(false);
  const [showExcuteModal, setShowExcuteModal] = useState({
    show: false,
    medicationId: null,
  });
  const { data } = useGetAllPrescribedMedicine(treatment.id);
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
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Treatment Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h5>Treatment Name: {treatment.name}</h5>
          <p>Description: {treatment.description}</p>
          <p>Cost: {treatment.cost}</p> */}
          <Row className="">
            <Col sm={4} className="px-4">
              <p className="mb-0 text-muted">Patient's Name</p>
              <p className="small">
                {patient.firstName +
                  " " +
                  patient.middleName +
                  " " +
                  patient.lastName}
              </p>
            </Col>
            <Col sm={4} className="px-4">
              <p className="mb-0 text-muted">Patient Id</p>
              <p className="small">{patient?.card_number}</p>
            </Col>
            <Col sm={4} className="px-4">
              <p className="mb-0 text-muted">Phone</p>
              <p className="small">{patient?.address?.phone_1}</p>
            </Col>
            <Col sm={4} className="px-4">
              <p className="mb-0 text-muted">Visit Type</p>
              <p className="small">{medicalRecord?.visit?.visit_type}</p>
            </Col>
            <Col sm={4} className="px-4">
              <p className="mb-0 text-muted">Visit Date</p>
              <p className="small">{medicalRecord?.visit?.assignment_date}</p>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center p-2">
            <h5 className="mb-0">Prescribed Medicines</h5>
            <Button
              onClick={() => setShowExcuteAllModal(true)}
              variant="info"
              className="btn-sm"
            >
              Excute All
            </Button>
          </div>
          {/* <Table responsive striped bordered>
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
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
          <Tabs
            defaultActiveKey="Unexcuted"
            id="uncontrolled-tab-example"
            className="mb-3 mt-2 border-bottom consultationHistory"
            variant="underline"
            // justify
          >
            <Tab eventKey="Unexcuted" title="Unexcuted Medication">
              {/* <HomeTab patientId={state.patient_id} /> */}
              <UnExcutedTreatmentTab treatmentId={treatment?.id} />
            </Tab>
            <Tab eventKey="Excuted Medication" title="Excuted Medication">
              <ExcutedTreatementTab treatmentId={treatment?.id} />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
    </>
  );
};

export default ViewTreatmentDetailModal;
