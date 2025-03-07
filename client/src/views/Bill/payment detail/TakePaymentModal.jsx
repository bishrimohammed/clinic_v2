import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useTakePayment } from "../hooks/useTakePayment";
const paymentSchema = yup.object().shape({
  patientId: yup.string(),
  patientName: yup.string(),
  visitDate: yup.date(),
  paymentName: yup.string(),
  paymentAmount: yup.string().required("Payement amount is Required"),
});
const TakePaymentModal = ({
  show,
  handleClose,
  visit,
  patient,
  paymentId,
  item,
  externalService,
}) => {
  // console.log(visit);
  const { mutateAsync, isPending } = useTakePayment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientId: patient ? patient.card_number : "",
      patientName: patient
        ? patient.firstName + " " + patient.middleName + " " + patient.lastName
        : externalService?.patient_name,
      paymentName: item?.service_name,
      visitDate: visit ? visit.assignment_date : externalService?.service_time,
      paymentAmount: item.price,
    },
    resolver: yupResolver(paymentSchema),
  });
  // console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);
    const Data = {
      paymentId: paymentId,
      paymentAmount: data.paymentAmount,
    };
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal size="lg" show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Take payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            {patient && (
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Patient Id</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("patientId")}
                    //   value={patient.card_number}
                    disabled
                  />
                </Form.Group>
              </Col>
            )}

            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  {...register("patientName")}
                />
              </Form.Group>
            </Col>
            {patient && (
              <>
                {" "}
                <Col md={4} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {visit ? "Visit Date" : "Service Date"}
                    </Form.Label>
                    <Form.Control
                      type="date"
                      {...register("visitDate")}
                      //   value={visit.assignment_date}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={4} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="etxt"
                      {...register("paymentName")}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register("paymentAmount")}
                  //   value={item.price}
                  disabled={item.isFixed}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" disabled={isPending} variant="success">
              {isPending && <Spinner size="sm" />}
              Pay
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TakePaymentModal;
