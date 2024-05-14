import React, { useEffect } from "react";
import { Alert, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useGetEmployees } from "../../Administration/employee/hooks/useGetEmployees";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddEmployeeToDuty } from "../hooks/useAddEmployeeToDuty";
const Schema = yup.object().shape({
  employeeId: yup.string().required("Employee is required"),
});
const AddEmployeeToDutyModal = ({ show, handleClose, duty_date }) => {
  const { state } = useLocation();
  const { data: employee } = useGetEmployees({ status: "true" });
  const { mutateAsync, isPending } = useAddEmployeeToDuty();
  const [errorState, setErrorState] = React.useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(Schema),
  });
  useEffect(() => {
    if (errorState) {
      const timeOut = setTimeout(() => {
        setErrorState("");
      }, 5000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [errorState]);

  console.log(errors);
  const submitHandler = (data) => {
    console.log(data);
    const Data = {
      employee_id: data.employeeId,
      duty_date,
      duty_id: state.id,
    };
    console.log(Data);
    // handleClose();
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);

        setErrorState(err?.response?.data?.message);
      });
  };
  return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee To Duty</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-2">
        {errorState && (
          <Alert variant="danger" dismissible>
            {errorState}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group controlId="employee">
                <Form.Label>Employee</Form.Label>
                <Form.Select
                  {...register("employeeId")}
                  isInvalid={errors.employeeId}
                >
                  <option value="">Select Employee</option>
                  {employee?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.firstName} {item.middleName} {item.lastName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.employeeId?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group controlId="employee">
                <Form.Label>Duty Date</Form.Label>
                <Form.Control type="date" value={duty_date} disabled>
                  {/* <option>Select Employee</option>
                  {employee?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.firstName} {item.middleName} {item.lastName}
                    </option>
                  ))} */}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0 mt-1">
            <button className="btn btn-danger" onClick={() => handleClose()}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending && <Spinner animation="border" />}
              Save
            </button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeToDutyModal;
