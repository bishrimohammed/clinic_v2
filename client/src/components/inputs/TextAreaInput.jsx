import React from "react";
import { Form } from "react-bootstrap";
//import { Form } from "react-hook-form";

const TextAreaInput = ({ register, name, errors }) => {
  return (
    <React.Fragment>
      {/* <Form.Label>{label}</Form.Label> */}
      <Form.Control
        style={{ minHeight: 130 }}
        as="textarea"
        id={name}
        {...register(name)}
        //className="border-color"
        isInvalid={errors}
      />
      <Form.Control.Feedback type="inValid" className="small text-danger">
        {errors?.message}
      </Form.Control.Feedback>
    </React.Fragment>
  );
};

export default TextAreaInput;
