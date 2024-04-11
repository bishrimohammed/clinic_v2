/* eslint-disable react/prop-types */
import React from "react";
import { Form } from "react-bootstrap";

const TextInput = ({ label, register, name, errors }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        id={name}
        {...register(name)}
        isInvalid={errors}
        // className="border-color"
        placeholder="Enter..."
      />
      <Form.Control.Feedback type="inValid" className="small text-danger">
        {errors?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInput;
