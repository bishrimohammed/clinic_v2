import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

export const PatientSearchForm = ({ searchHandler }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  //const searchHandler = (data) => {};
  return (
    <Form onSubmit={handleSubmit(searchHandler)}>
      <Form.Group>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="card , phone"
            type="text"
            id="search"
            {...register("search", { required: "enter to search" })}
            isInvalid={errors.search}
          />
          <Button
            variant="outline-secondary"
            className="border-1"
            id="button-addon2"
            type="submit"
          >
            <BiSearch />
          </Button>
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.search?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};
