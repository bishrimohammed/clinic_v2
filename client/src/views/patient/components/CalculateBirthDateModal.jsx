import React, { useRef } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const Schema = yup.object().shape({
  age: yup.number(),
  month: yup
    .number()
    .transform((value) => {
      if (isNaN(value)) {
        return 0;
      }
      return value;
    })
    .min(0, "Month must be greater than or equal to 0 ")
    .max(12, "Month must be less than or equal to 12"),
  day: yup
    .number()
    .transform((value) => {
      if (isNaN(value)) {
        return 0;
      }
      return value;
    })
    .min(0, "Day must be greater than or equal to 0 ")
    .max(31, "Day must be less than or equal to 31"),
});
const CalculateBirthDateModal = ({
  show,
  handleClose,
  setValue,
  birthDateError,
  clearErrors,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const calculate = (data) => {
    // const today = new Date();
    // const birthYear = today.getFullYear() - parseInt(Math.abs(data.age));

    // const birthDate = new Date(birthYear, data.month - 1, data.day + 1);

    let currentDate = new Date();

    // Calculate the birth year
    let birthYear = currentDate.getFullYear() - data.age;

    // Calculate the birth month
    // console.log(currentDate.getMonth());
    // console.log(data.month);
    let birthMonth = currentDate.getMonth() + 1 - data.month;
    if (birthMonth <= 0) {
      birthMonth += 12;
      birthYear--;
    }

    // Calculate the birth day
    let birthDay = currentDate.getDate() - data.day;
    console.log(birthDay);
    if (birthDay < 0) {
      const monthDays = new Date(birthYear, birthMonth, 0).getDate();
      birthDay += monthDays;
      birthMonth--;
      if (birthMonth <= 0) {
        birthMonth += 12;
        birthYear--;
      }
    }
    const BD = new Date(birthYear, birthMonth - 1, birthDay + 1)
      .toISOString()
      .substring(0, 10);
    // return;
    setValue("birth_date", BD.substring(0, 10));
    // setValue("birth_date", birthDate.toISOString().substring(0, 10));
    if (birthDateError) {
      clearErrors("birth_date");
    }
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Calculate Birth Date</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(calculate)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  // ref={ageRef}
                  {...register("age")}
                  required
                  type="number"
                  min={0}
                  max={100}
                  name="age"
                />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group className="mb-3">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  // ref={monthRef}
                  {...register("month")}
                  type="number"
                  min={0}
                  name="month"
                  max={12}
                  isInvalid={errors.month}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.month?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  // ref={dayRef}
                  {...register("day")}
                  isInvalid={errors.day}
                  type="number"
                  min={0}
                  name="day"
                  // max={30}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                {errors.day?.message}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
            <Button type="submit" variant="primary">
              Calculate
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CalculateBirthDateModal;
