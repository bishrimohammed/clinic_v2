import React, { useEffect } from "react";
import { Alert, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useFinishConsultation } from "../hooks/consultationHooks/useFinishConsultation";

const FinishConsultationBtn = () => {
  const [showFinishConsultationModal, setShowFinishConsultationModal] =
    React.useState(false);
  const { state } = useLocation();
  const { mutateAsync, isPending } = useFinishConsultation();
  const [errorState, setErrorState] = React.useState("");
  //   console.log(state);
  const discharge_summaryRef = React.useRef("");
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
    // console.log(discharge_summary);
    // return;
    mutateAsync({
      medicalRecordId: state.medicalRecord_id,
      formData: { discharge_summary },
    })
      .then((res) => {
        if (res.status === 200) {
          // handleClose();
          setShowFinishConsultationModal(false);
          navigate("/visit");
        }
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setErrorState(err.response.data.message);
      });
  };
  return (
    <>
      <Button
        form="traigeForm"
        className="btn-sm"
        // formTarget="traigeForm"
        type="submit"
        variant="success"
        // disabled={disabledFinishButton}
        onClick={() => setShowFinishConsultationModal(true)}
      >
        {/* {isPending && <Spinner size="sm" animation="border" />} */}
        Finish
      </Button>
      <Modal
        size="lg"
        show={showFinishConsultationModal}
        onHide={() => setShowFinishConsultationModal(false)}
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
            <Button
              variant="secondary"
              onClick={() => setShowFinishConsultationModal(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="primary"
              onClick={dischargeSummaryHandler}
            >
              {isPending && <Spinner size="sm" />}
              Discharge
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FinishConsultationBtn;
