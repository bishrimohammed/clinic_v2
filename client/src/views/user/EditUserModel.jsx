import React from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetRoles } from "../hooks/useGetRoles";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useUpdateUser } from "./hooks/useUpdateUser";
const schema = yup.object().shape({
  //   employeeId: yup.string().required("Employee is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "password must be greater than 6 characters")
    .required("Password is required"),
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref("password")], "password not match")
  //     .required("Confirm  Password is required"),
  // gender: yup.string().required("Gender is required"),
  // phone: yup.string().required("phone is required"),
  role: yup.string().required("role is required"),
  // age: yup.string().required("age is required"),
});

const EditUserModel = ({ show, handleClose, user }) => {
  const { data: roles, isPending: ispending } = useGetRoles();
  const { mutateAsync, isPending } = useUpdateUser();
  // const {data:permissions} = useGetPermissions()
  //   console.log(user);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      //   employeeId: "",
      role: user.role_id,
      email: user.email,
      password: "",
      //   confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  console.log(errors);
  // const roleWatcher = watch("role");
  const submitHandler = (data) => {
    console.log(data);
    // return;
    mutateAsync({ data, userId: user.id }).then(async (res) => {
      if (res.status === 200) {
        // await refetch();
        handleClose(false);
      }
    });
  };
  //   if (ispending) {
  //     return <Spinner animation="border" variant="primary" />;
  //   }
  // console.log(roles);
  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={() => handleClose(false)}
        className="p-3"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Row>
              <Col md={4} sm={6} className="mb-2">
                <Form.Group>
                  <Form.Label>Employees</Form.Label>
                  <Form.Control
                    // {...register("employeeId")}
                    // isInvalid={errors.employeeId}
                    defaultValue={
                      user.employee.firstName + " " + user.employee.middleName
                    }
                    disabled
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.employeeId?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className="mb-2">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    errors={errors.email}
                    name="email"
                    {...register("email")}
                    type="email"
                    placeholder="example@gmail.com"
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    isInvalid={errors.password}
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {/* <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="password"
                    isInvalid={errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col> */}
              <Col md={4} sm={6} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    // ref={roleref}
                    {...register("role")}
                    name="role"
                    aria-label="Default select example"
                    placeholder="confirm password"
                    isInvalid={errors.role}
                  >
                    <option value="">Select role</option>
                    {roles?.map((r, index) => (
                      <option key={index} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* <hr /> */}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isPending}>
                {isPending && <Spinner animation="border" size="sm" />}+ Update
                User
              </Button>
            </Modal.Footer>
            {/* <div className="d-flex justifyContentEnd">
              <Button
                variant="primary"
                // disabled={isPending}
                className=""
                type="submit"
              >
                {isPending && <Spinner animation="border" size="sm" />}
                Register User
              </Button>
            </div> */}
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default EditUserModel;
