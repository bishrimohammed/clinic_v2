import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { useRenewAgreement } from "../hooks/useRenewAgreement";

const AgreementSchema = yup.object().shape({
  id: yup.number(),
  agreement_doc: yup
    .mixed()
    .test(
      "conditionalRequired",
      "Agreement Document is required",
      function (value) {
        console.log(value.length);
        if (value.length == 0) {
          return this.createError({
            path: "agreement_doc",
            message: "Agreement Document is required",
          });
        }
        return true;
      }
    )
    .nullable(),
  start_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .nullable()
    .required("Start date is required"),
  end_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .when("start_date", ([start_date], schema) => {
      if (start_date) {
        return schema.min(start_date, "End date must be after start date");
      }
      return schema;
    })
    .nullable()
    .required("End date is required"),
  max_limit: yup
    .number()
    .typeError("Credit limit must be a valid number")
    .moreThan(0, "Credit limit must be greater than 0"),
});
const RenewAgreemnet = ({ show, handleClose, compnayId }) => {
  const { state } = useLocation();
  // console.log(state);
  const { mutateAsync, isPending } = useRenewAgreement();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: state.id,
      // start_date: new Date(),
      // end_date: new Date(),
      // max_limit: 0,
      // // agreement_doc: ""
    },
    resolver: yupResolver(AgreementSchema),
  });
  console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("company_id", state.id);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("max_limit", data.max_limit);
    formData.append("agreement_doc", data.agreement_doc[0]);
    mutateAsync(formData).then((res) => {
      if (res.status === 201) {
        handleClose(false);
      }
    });
  };
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Renew Agreement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  {...register("start_date")}
                  isInvalid={errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  {...register("end_date")}
                  isInvalid={errors.end_date}
                  min={new Date().toISOString().substring(0, 10)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.end_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Agreement Doc</Form.Label>
                <Form.Control
                  {...register("agreement_doc")}
                  type="file"
                  name="agreement_doc"
                  accept=".pdf,.doc,.docx"
                  //   required={true}
                  isInvalid={errors.agreement_doc}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.agreement_doc?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Maximum Credit Limit</Form.Label>
                <Form.Control
                  {...register("max_limit")}
                  type="number"
                  step="0.01"
                  min={0}
                  isInvalid={errors.max_limit}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.max_limit?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Renew
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenewAgreemnet;
