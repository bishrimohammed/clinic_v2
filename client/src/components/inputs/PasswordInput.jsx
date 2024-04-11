/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const PasswordInput = ({ label, register, name, errors }) => {
  console.log(errors);
  console.log(label);
  console.log(name);
  // console.log(register);
  //const errorname = name;
  //console.log(oldPassword);
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="password"
        id={name}
        {...register(name)}
        className="border-color"
        isInvalid={errors}
        placeholder="Enter..."
      />
      <Form.Control.Feedback type="invalid" className="small text-danger">
        {errors?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default PasswordInput;
