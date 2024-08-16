import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useFinishProgressNote } from "../hooks/progressNoteHooks/useFinishProgressNote";

const FinishProgressNoteModal = ({ show, handleClose }) => {
  const { state } = useLocation();
  const { mutateAsync, isPending } = useFinishProgressNote();
  const [errorState, setErrorState] = useState("");
  console.log(state);
  const discharge_summaryRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (errorState) {
      const timer = setTimeout(() => {
        setErrorState("");
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorState]);
  const dischargeSummaryHandler = () => {
    const discharge_summary = discharge_summaryRef.current.value;
    console.log(discharge_summary);
    mutateAsync({
      medicalRecord_id: state.medicalRecord_id,
      formData: { discharge_summary },
    })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          navigate("/visit");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setErrorState(err.response.data.message);
        // console.log(err);
      });
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      // centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Discharge Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState && <Alert variant="danger">{errorState}</Alert>}
        <Form.Label>Discharge Summary </Form.Label>
        <Form.Control
          as="textarea"
          style={{ minHeight: 150 }}
          ref={discharge_summaryRef}
        />
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant="danger"
            onClick={dischargeSummaryHandler}
          >
            {isPending && <Spinner size="sm" />}
            Discharge
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FinishProgressNoteModal;
