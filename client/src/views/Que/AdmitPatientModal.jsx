/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

import { toast } from "react-toastify";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";
import { AxiosHeaders } from "../../api/useAxiosHeaders";
const Admit = ({ patient, handleClose }) => {
  //console.log(patient);
  const { headers } = AxiosHeaders();
  const queryClient = useQueryClient();
  //console.log(headers);
  const AssignnoteRef = useRef();
  //const typeref = useRef();
  const CopaymentAmountRef = useRef();
  const CopaymentNoteRef = useRef();

  const lastVistDate = moment(new Date(patient.lastVisit) || new Date()).format(
    "L"
  );
  const todayDate = moment(new Date()).format("L");
  const date1 = moment(lastVistDate);
  const date2 = moment(todayDate);
  const day_diff = date2.diff(date1, "days");
  let pay_require = {
    isneeded: false,
    reason: "",
  };
  if (day_diff > 10) {
    pay_require.isneeded = true;
    pay_require.reason = "Patient has not been seen for more than 10 days.";
  } else if (patient.patient_history.length === 0) {
    pay_require.isneeded = true;
    pay_require.reason = "This is the first visit of this patient.";
  } else {
    pay_require.isneeded = false;
    pay_require.reason = "Patient has been seen within the last 10 days.";
  }
  const AdmitPatientMut = useMutation({
    mutationKey: `admitPatient`,
    mutationFn: async (data) => {
      return Axiosinstance.post("/doctorque", data, {
        headers: headers,
      }); /* .then(
        (res) => res.data
      ); */
    },
    onSuccess: async (data) => {
      toast.success(`${data.data.patient.name}  admitted successfully`);
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["PatientWaitingList"],
        exact: true,
      });
    },
    onError: async (error) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const Assignnote = AssignnoteRef.current.value;
    const CopaymentFee = CopaymentAmountRef.current?.value;
    const Copaymentnote = CopaymentNoteRef.current?.value;
    const type = patient.status ? "followUp" : "New";
    const patientId = patient._id;
    if (CopaymentFee) {
      if (CopaymentFee <= 0) {
        toast.error("CopaymentFee must be greater than 0", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }
    const assign = {
      patientId,
      type,
      Assignnote,
      CopaymentFee,
      Copaymentnote,
    };
    console.log(assign);
    AdmitPatientMut.mutate(assign);
  };
  return (
    <Container>
      <div className="d-flex gap-4">
        <span>
          <span className="fw-bold me-2">Name:</span>
          {patient.name}
        </span>
        <span>
          <span className="fw-bold me-2">Sex:</span>
          {patient.gender}
        </span>
        <span>
          <span className="fw-bold me-2">MRN:</span>
          {patient.cardNumber}
        </span>
        <span>
          <span className="fw-bold me-2">Age:</span>
          {patient.age} years
        </span>
      </div>

      {pay_require.isneeded ? (
        <span style={{ fontSize: 10 }} className="fw-bold text-danger">
          he Need to Pay Registeration fee{" "}
          <span className="fw-bold me-1 ms-1 text-dark">Reason:</span>
          <span className="text-dark">{pay_require.reason}</span>
        </span>
      ) : (
        <span style={{ fontSize: 10 }} className="fw-bold text-success">
          He doesn't need to pay the registration fee
          <span className="fw-bold me-1 ms-2 text-dark">Reason:</span>
          <span className="text-dark">{pay_require.reason}</span>
        </span>
      )}

      <hr />
      <h6 className="mb-3 mt-3 fw-bold text-center">Admission Details</h6>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Assement Type</Form.Label>
              <Form.Select
                disabled={true}
                defaultValue={patient.status ? "followUp" : "New"}
                className="border border-3"
                aria-label="Default select example"
              >
                <option value="New">New Visit</option>
                <option value="followUp">followUp Visit</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Assignment Note</Form.Label>
              <Form.Control
                className="border border-3"
                ref={AssignnoteRef}
                type="text"
                placeholder="Enter..."
              />
            </Form.Group>
          </Col>
        </Row>
        {/*  <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Admit To</Form.Label>
              <Form.Select
                ref={deparRef}
                className="border border-3"
                aria-label="Default select example"
              >
                <option value="ODP">ODP</option>
                <option value="Laboratory">Laboratory</option>
              </Form.Select>
            </Form.Group> 
          </Col>
        </Row> */}
        {pay_require.isneeded && (
          <Row>
            <div className="mb-2" style={{ fontSize: "21px" }}>
              Copayment Fee
            </div>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label> Fee Amount</Form.Label>
                <Form.Control
                  className="border border-3"
                  ref={CopaymentAmountRef}
                  type="number"
                  required
                  placeholder="fee amount..."
                />
              </Form.Group>
            </Col>

            <Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label> Fee note</Form.Label>
                  <Form.Control
                    className="border border-3"
                    ref={CopaymentNoteRef}
                    type="text"
                    placeholder="Enter..."
                  />
                </Form.Group>
              </Col>
            </Col>
          </Row>
        )}

        <hr />
        <div className="d-flex justifyContentEnd">
          <Col>
            <Button
              variant="primary"
              disabled={AdmitPatientMut.isPending}
              className="w-100"
              type="submit"
            >
              {AdmitPatientMut.isPending && (
                <Spinner animation="border" size="sm" />
              )}
              Submit
            </Button>
          </Col>
        </div>
      </Form>
    </Container>
  );
};
const AdmitPatientModal = (props) => {
  //console.log(props.patient.lastVisit.getYear());

  const closeModal = () => {
    props.handleClose();
  };
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Admit patient={props.patient} handleClose={closeModal} />
      </Modal.Body>
    </Modal>
  );
};

export default AdmitPatientModal;
