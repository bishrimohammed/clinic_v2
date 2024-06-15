import React from "react";
import { Form, Modal } from "react-bootstrap";
import * as yup from "yup";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAddAdvancedPayment } from "./hooks/useAddAdvancedPayment";
import { toast } from "react-toastify";

// import { useAddAdvancedPayment } from "./hooks/useAddAdvancedPayment";

const advancedPaymentSchema = yup.object().shape({
  Amount: yup
    .number()
    .transform((value) => {
      if (isNaN(value)) {
        return undefined;
      }
      return value;
    })
    // .min(0, "Amount must be greater than zero")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  Description: yup.string().transform((value) => value.trim()),
});
const AddAdvancedPayment = ({ show, handleClose, billId, patient }) => {
  console.log(billId);
  const { mutateAsync, isPending } = useAddAdvancedPayment();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(advancedPaymentSchema),
  });
  const submitHandler = (data) => {
    console.log(data);
    // return;
    const Data = {
      formData: {
        amount: data.Amount,
        description: data.Description,
      },
      billId: billId,
      //   patient: patient
    };
    mutateAsync(Data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        alert("Payment Added Successfully");
        toast.success(
          `Advanced Payment Added Successfully for ${patient.firstName} ${patient.middleName}`
        );
        handleClose();
      }
      //   handleClose();
    });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Advanced Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <p>
            <span className="fw-bold">Patient Name:</span> {patient.firstName}{" "}
            {patient.middleName} {patient.lastName}{" "}
          </p>
          <p>
            <span className="fw-bold">ID:</span> {patient.card_number}{" "}
            {/* {patient.middleName} {patient.lastName}{" "} */}
          </p>
          <p>
            <span className="fw-bold">Phone:</span> {patient.phone}{" "}
            {/* {patient.middleName} {patient.lastName}{" "} */}
          </p>
        </div>

        <Form
          onSubmit={handleSubmit(submitHandler)}
          id="add-advanced-payment-form"
        >
          <Form.Group className="mb-3" controlId="Amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              {...register("Amount")}
              isInvalid={errors.Amount}
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.Amount?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              {...register("Description")}
              isInvalid={errors.Description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Description?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          form="add-advanced-payment-form"
          type="submit"
          disabled={isPending}
          className="btn btn-primary"
        >
          Save changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdvancedPayment;
